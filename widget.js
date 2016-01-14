/* global requirejs cprequire cpdefine chilipeppr THREE */
// Defining the globals above helps Cloud9 not show warnings for those variables

// ChiliPeppr Widget/Element Javascript

cprequire_test(["inline:com-chilipeppr-widget-eagle-dispense"], function(dispense) {

    // Test this element. This code is auto-removed by the chilipeppr.load()
    // when using this widget in production. So use the cpquire_test to do things
    // you only want to have happen during testing, like loading other widgets or
    // doing unit tests. Don't remove end_test at the end or auto-remove will fail.

    console.log("test running of " + dispense.id);

    // adjust my title
    $('title').html(dispense.name);
    
    $('body').prepend(
        '<div id="com-chilipeppr-flash"></div>' +
        '<div id="test-drag-drop"></div>' +
        '<div id="3dviewer"></div>' +
        '<div id="test-eagle" style="position: relative; width: 320px; background:none;"></div>' +
        ''
    );

    chilipeppr.load("#3dviewer", "http://fiddle.jshell.net/chilipeppr/y3HRF/195/show/light/", function() {
        cprequire(['inline:com-chilipeppr-widget-3dviewer'], function(threedviewer) {

            // When we init the 3d viewer, tell it to not do its own drag/drop
            threedviewer.init({
                doMyOwnDragDrop: false
            });

            // do some tweaking of the layout
            // $('#com-chilipeppr-widget-eagle').css('position', 'absolute');
            // $('#com-chilipeppr-widget-eagle').css('left', '10px');
            // $('#com-chilipeppr-widget-eagle').css('top', '10px');
            // $('#com-chilipeppr-widget-eagle').css('width', '300px');

            
            // now load the eagle widget, so that we can init our solder mask widget
            chilipeppr.load(
                "#test-eagle",
//              "https://raw.githubusercontent.com/chilipeppr/widget-eagle/master/auto-generated-widget.html",
                "https://raw.githubusercontent.com/xpix/widget-eagle/master/auto-generated-widget.html",
                function() {
                    // Callback after widget loaded into #myDivWidgetInsertedInto
                    
                    cprequire(
                        ["inline:com-chilipeppr-widget-eagle"],
                        function(eagleWidget) {
                            // Callback that is passed reference to your newly loaded widget
                            console.log("Eagle widget just got loaded.", eagleWidget);
                            
                            $('#com-chilipeppr-widget-eagle').css('background', 'none');

                            // only init eagle widget once 3d is loaded
                            // set doMyOwnDragDrop
                            eagleWidget.init(true);
                            
                            // now init our own widget
                            dispense.init(eagleWidget);
                        }
                    );
                    
                }
            );
            

        });
    });

    chilipeppr.load("#test-drag-drop", "http://fiddle.jshell.net/chilipeppr/Z9F6G/show/light/",

        function() {
            cprequire(
                ["inline:com-chilipeppr-elem-dragdrop"],

                function(dd) {
                    dd.init();
                    dd.bind("body", null);
                });
        });

    chilipeppr.load("#com-chilipeppr-flash",
        "http://fiddle.jshell.net/chilipeppr/90698kax/show/light/",

        function() {
            console.log("mycallback got called after loading flash msg module");
            cprequire(["inline:com-chilipeppr-elem-flashmsg"], function(fm) {
                //console.log("inside require of " + fm.id);
                fm.init();
            });
        });

} /*end_test*/ );

// This is the main definition of your widget. Give it a unique name.
cpdefine("inline:com-chilipeppr-widget-eagle-dispense", ["chilipeppr_ready", /* other dependencies here */ ], function() {
    return {
        /**
         * The ID of the widget. You must define this and make it unique.
         */
        id: "com-chilipeppr-widget-eagle-dispense", // Make the id the same as the cpdefine id
        name: "Widget Add-On / Dispenser", // The descriptive name of your widget.
        desc: "This add-on widget is a tab for the Eagle BRD widget that helps you generate gcode for dispense solderpaste drop's to a pcb.", // A description of what your widget does
        url: "(auto fill by runme.js)", // The final URL of the working widget as a single HTML file with CSS and Javascript inlined. You can let runme.js auto fill this if you are using Cloud9.
        fiddleurl: "(auto fill by runme.js)", // The edit URL. This can be auto-filled by runme.js in Cloud9 if you'd like, or just define it on your own to help people know where they can edit/fork your widget
        githuburl: "(auto fill by runme.js)", // The backing github repo
        testurl: "(auto fill by runme.js)", // The standalone working widget so can view it working by itself
        /**
         * Dispenser VARIABLES.
         */
        cannulaDiameter: 1,
        startreleaseoffset: 1.0,
        DispenserXoffset: 0.0,
        DispenserYoffset: 0.0,
        dispenserAxis: 'X',
        gcodeOrderNumber: 20,
        renderedDrops: [],
        colorsDrop: [0x298A08, 0x868A08, 0x8A0808] , // green, yellow, red
        options: {
           cannulaDiameter: 1,
           startreleaseoffset: 1.0,
           DispenserXoffset: 0.0,
           DispenserYoffset: 0.0,
           dispenserAxis: 'X'
        }, // holds base options before loading from localStorage
        /**
         * Define pubsub signals below. These are basically ChiliPeppr's event system.
         * ChiliPeppr uses amplify.js's pubsub system so please refer to docs at
         * http://amplifyjs.com/api/pubsub/
         */
        /**
         * Define the publish signals that this widget/element owns or defines so that
         * other widgets know how to subscribe to them and what they do.
         */
        publish: {
            // Define a key:value pair here as strings to document what signals you publish.
            //'/onExampleGenerate': 'Example: Publish this signal when we go to generate gcode.'
        },
        /**
         * Define the subscribe signals that this widget/element owns or defines so that
         * other widgets know how to subscribe to them and what they do.
         */
        subscribe: {
            // Define a key:value pair here as strings to document what signals you subscribe to
            // so other widgets can publish to this widget to have it do something.
            // '/onExampleConsume': 'Example: This widget subscribe to this signal so other widgets can send to us and we'll do something with it.'
        },
        /**
         * Document the foreign publish signals, i.e. signals owned by other widgets
         * or elements, that this widget/element publishes to.
         */
        foreignPublish: {
            // Define a key:value pair here as strings to document what signals you publish to
            // that are owned by foreign/other widgets.
        
            "/com-chilipeppr-widget-3dviewer/request3dObject" : 'We need to work with the 3D Viewer and inject content, so by sending out this signal the 3D viewer hears it and sends us back a /recv3dObject with the payload.'
        },
        /**
         * Document the foreign subscribe signals, i.e. signals owned by other widgets
         * or elements, that this widget/element subscribes to.
         */
        foreignSubscribe: {
            // Define a key:value pair here as strings to document what signals you subscribe to
            // that are owned by foreign/other widgets.
            // '/com-chilipeppr-elem-dragdrop/ondropped': 'Example: We subscribe to this signal at a higher priority to intercept the signal. We do not let it propagate by returning false.'
            '/com-chilipeppr-widget-eagle/addGcode' : 'This add-on subscribes to this signal so we can inject our own Gcode into the overall Eagle Widget gcode.',
            '/com-chilipeppr-widget-3dviewer/recv3dObject' : 'We need to get the 3D Viewer so we can inject stuff into it. We must subscribe to this so when we call /request3dObject we get this signal back with the payload of the viewer.'
        },
        /**
         * Holds the reference to the main Eagle Widget that we are an add-on for.
         */
        eagleWidget: null,
        /**
         * All widgets should have an init method. It should be run by the
         * instantiating code like a workspace or a different widget.
         */
        init: function(eagleWidget) {
            
            // if(eagleWidget === undefined)
            //    return;
                        
            this.eagleWidget = eagleWidget;
            console.log("I am being initted. eagleWidget:", this.eagleWidget);

            // first thing we need to do is get 3d obj
            this.get3dObj(function() {
                // when we get here, we've got the 3d obj 
                this.setupUiFromLocalStorage();
                this.subscribeToAddGcodeSignal();
                this.subscribeToBeforeRender();
                this.injectTab();
            });

            console.log("I am done being initted.");
        },
        /**
         * Inject the solder mask tab into the Eagle Brd Widget
         */
        injectTab: function() {
            
            // create our tab header
            var tabHdrEl = $('<li xclass="active">' +
                '<a href="#' + this.id + 
                '" role="tab" data-toggle="tab">' +
                'Dispense</a></li>'
            );
            $('#com-chilipeppr-widget-eagle .panel-body .nav-tabs').append(tabHdrEl);
            
            // move the tab from our html and move it into the correct spot
            var tab = $('#' + this.id).detach();
            $('#com-chilipeppr-widget-eagle .panel-body .tab-content').append(tab);
            tab.removeClass("hidden");
            
            var that = this;
            $('#com-chilipeppr-widget-eagle a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                console.log("DSP tab shown. e:", $(e.target).attr("href"));
                var target = $(e.target).attr("href"); // activated tab
                if (target.match(/#com-chilipeppr-widget-eagle-dispense/)) {
                    // we just got shown
                    that.onTabShown();
                } else {
                    that.onTabHide();
                }
            });
        },
        isTabShowing: false,
        /**
         * Holds the DSP 3d object that we show in the 3D viewer.
         */
        dispense3d: null,
        /**
         * widget to know if startet or not.
         */
        started: function(){
            return (this.mySceneGroup == null ? false: true);
        },
        /**
         * When the user clicks to activate our tab, this event is called.
         */
        onTabShown: function() {
            this.isTabShowing = true;
            if (this.mySceneGroup != null){
                this.mySceneGroup.children.forEach(function(child){
                    child.visible = true; 
                });
            } else {
                this.drawdispense();
            }
        },
        /**
         * When the user clicks a different tab and this one gets hidden.
         */
        onTabHide: function() {
            console.log('DSP tab hide');
            this.isTabShowing = false;
            this.sceneRemove(this.dispense3d);
        },
        /**
         * Iterate through the Eagle BRD dimensions XY coordinates and draw
         * a solder mask over the board.
         */
        drawdispense: function() {
            // draw dispense drops
            this.renderDispenserDrops(this.eagleWidget);
        },
        /**
         * We subscribe to the main Eagle Widget's addGcode publish signal
         * so that we can inject our own Gcode to the main widget.
         */
        subscribeToAddGcodeSignal: function() {
            console.log('run subscribeToAddGcodeSignal');
            chilipeppr.subscribe("/com-chilipeppr-widget-eagle/addGcode", this, this.onAddGcode);
        },
        /**
         * We subscribe to the main Eagle Widget's addGcode publish signal
         * so that we can inject our own Gcode to the main widget.
         */
        subscribeToBeforeRender: function() {
            console.log('run /com-chilipeppr-widget-eagle/beforeToolPathRender');
            chilipeppr.subscribe("/com-chilipeppr-widget-eagle/beforeToolPathRender", this, this.onBeforeRender);
        },
        /**
         * This is our callback that gets called when the /com-chilipeppr-widget-eagle/addGcode
         * signal is published by the main Eagle Widget. This is where we get to actually
         * inject our own Gcode to the final overall Gcode.
         */
        onAddGcode : function(addGcodeCallback, gcodeParts, eagleWidget, helpDesc){
            console.log("Got onAddGcode:", arguments);

            // if DSP widget startet (user activate the DSP Tab)
            if(! this.started())
                return;

            if( $('#' + this.id).find('.onlydispensegcode').is(':checked') ){
                // remove all milling code for testing or to choose only DSP
                for(var i = 200;i<=1299;i++){
                    gcodeParts[i] = undefined;
                    
                }
            }

            // if user don't want produce DSP gcode
            if($('#' + this.id).find('.activedispensegcode').is(':checked') ){
                addGcodeCallback(1300, this.exportGcodeDispenser(eagleWidget) );
            }
            else {
                gcodeParts[1300] = undefined;
            }
        },
        /**
         * After Render Register all components and sort to the trays and pockets
         */
        onBeforeRender : function(self){
            console.log("Get onBeforeRender:", self);
            // action to make drops

            if( this.isTabShowing ){
                var that = this;
                console.log("Tab are showing, regenerate DSP drops", this.isTabShowing);
                setTimeout(function(){
                    that.mySceneGroup = null;
                    that.onTabShown();
                }, 2000);
            }
        },
        setCanullaDiameter: function(evt){
            console.log("setCanullaDiameter. evt.data:", evt.data, "evt:", evt);
            var diameter = $(evt.currentTarget).attr('diameter');
            console.log("setCanullaDiameter. diameter:", diameter);
            $('#com-chilipeppr-widget-eagle-dispense').find('.cannulaDiameter').val(diameter);
            $('#com-chilipeppr-widget-eagle-dispense').find('.cannulaDiameter').trigger('change');
        },
        renderDispenserDrops:function(PARENT){
            var that = this;
            console.log('renderDispenserDrops: ', PARENT);

            if(! $('#com-chilipeppr-widget-eagle-dispense .dispenser-active').is(':checked'))
               return;
            
            // get all smd pads,
            var clippers = PARENT.clipperBySignalKey;
            console.group("drawDispenserDrops");
            for ( var keyname in clippers ){
               clippers[keyname].smds.forEach(function(smd){
                  // get absolute position'
                  var vector = new THREE.Vector3();
                  vector.setFromMatrixPosition( smd.threeObj.matrixWorld );

                  var diameter = that.cannulaDiameter+(that.cannulaDiameter/2);
                  var radius = diameter / 2;
                  var ar_drop = Math.PI * (radius*radius);
                  
                   // Calculate bigger smd pads as canulla diameter*2
                   // +-----+
                   // | O O |
                   // | O O |
                   // +-----+
                   var s = smd.smd;
                   var sgroup = smd.threeObjSmdGroup;
                   console.log("SMD Pad: ", smd);
                   if(s.dx >= diameter*2 || s.dy >= diameter*2){
                        var steps_x = Math.round(s.dx/diameter);
                        var steps_y = Math.round(s.dy/diameter);
                        var space_x = (s.dx-(steps_x * diameter)) / steps_x;
                        var space_y = (s.dy-(steps_y * diameter)) / steps_y;

                        var startx = vector.x-(s.dx/2) + radius + (space_x/2);
                        var starty = vector.y-(s.dy/2) + radius + (space_y/2);

                        var group = new THREE.Object3D();//create an empty container
                        for(var iy=1; iy <= steps_y; iy++){
                           for(var ix=1; ix <= steps_x;ix++){
                              var drop = PARENT.drawSphere(startx, starty, (that.cannulaDiameter/2), that.colorsDrop[0]);
                              group.add( drop );//add a mesh with geometry to it
                              startx += diameter + space_x;
                           }
                           startx = vector.x-(s.dx/2) + radius + (space_x/2);
                           starty += diameter + space_y;
                        }
                        that.renderedDrops.push(group);
                        if (s.rot != null) {
                           var rot = parseInt(s.rot.replace(/\D+/,''));
                           var r = (Math.PI / 180) * rot;
                           var axis = new THREE.Vector3(0, 0, 1);
                           PARENT.rotateAroundObjectAxis(group, axis, r);
                        }
                        that.sceneAdd(group);
                   }  else {
                     // calculate area and mark drop with traffic colors
                     var ar_smd = s.dx * s.dy;
                     var percent = percent = ar_smd / (ar_drop/100); // area from drop greather then smd pad
                     if(ar_smd > ar_drop)                            // area from smd pad greather then drop
                        percent = ar_drop / (ar_smd/100);
                     var color = that.colorsDrop[0];
                     if(percent < 80)
                        color = that.colorsDrop[1];
                     if(percent < 50)
                        color = that.colorsDrop[2];
                     // draw a drop (cone) on this position
                     var drop = PARENT.drawSphere(vector.x, vector.y, (that.cannulaDiameter/2), color);
                     that.sceneAdd(drop);
                     that.renderedDrops.push(drop);
                  }
               });
            }
            console.groupEnd("drawDispenserDrops");

            // finish
        },
        exportGcodeDispenserDrop:function(drop, count, PARENT){
            var g = '';
            var that = this;

            var dropDepth = (that.cannulaDiameter/2).toFixed(4); // got to 1/2 Diameter height, means 1mm drop / Z:0.5mm

            var vector = new THREE.Vector3();
            vector.setFromMatrixPosition( drop.matrixWorld  );

            g += "(generate Drop Nr: " + count + ")\n";        // Comment to see the blocks
            g += "G0 F200 Z" + PARENT.clearanceHeight + "\n";         // save height               i.e: Z:1mm
            g += "G0 X" + (vector.x + that.options.DispenserXoffset).toFixed(4)
                        + " Y" + (vector.y + that.options.DispenserYoffset).toFixed(4)
                        + "\n";                                // got to position of drop
            g += "G0 Z" + dropDepth  + "\n";                   // careful go to dropdepth        i.e: Z:0.05mm
            g += "(chilipeppr_pause drop" 
                  + count + " G1 F100 "  
                  + that.dispenserAxis 
                  + that.cannulaDiameter 
                  + ")\n";                                     // Send pause event and wait for second cnc controller
            g += "G1 F200 Z" + PARENT.clearanceHeight + "\n";          // slow go up to 1mm/3 =    i.e: Z:0.33mm

            return g;
        },
        exportGcodeDispenser:function(PARENT){
            var g = '';
            var that = this;

            if(! $('#com-chilipeppr-widget-eagle .dispenser-active').is(':checked'))
               return g;

            console.group('exportGcodeDispenser');

            g += "(------ DISPENSER DROP's -------)\n";
            g += "M5 (spindle stop)\n";

            // generate gcode for every drop
            var i = 0;
            this.renderedDrops.forEach(function(thing) {
               console.log('Thing', thing);      
               if(thing.type == 'Object3D'){
                  thing.children.forEach(function(drop){
                     g += that.exportGcodeDispenserDrop(drop, ++i, PARENT);
                  });
               }
               else{
                  g += that.exportGcodeDispenserDrop(thing, ++i, PARENT);
               }
            }, this);

            console.log('Dispenser GCODE', g);
            console.groupEnd('exportGcodeDispenser');
            return g;
        },
        /**
         * return 3dobject from 3dviewer.
         */
        get3dObj: function (callback) {
            this.userCallbackForGet3dObj = callback;
            chilipeppr.subscribe("/com-chilipeppr-widget-3dviewer/recv3dObject", this, this.get3dObjCallback);
            chilipeppr.publish("/com-chilipeppr-widget-3dviewer/request3dObject", "");
            chilipeppr.unsubscribe("/com-chilipeppr-widget-3dviewer/recv3dObject", this.get3dObjCallback);
        },
        get3dObjCallback: function (data, meta) {
            console.log("got 3d obj:", data, meta);
            this.obj3d = data;
            this.obj3dmeta = meta;
            if (this.userCallbackForGet3dObj) {
                this.userCallbackForGet3dObj();
                this.userCallbackForGet3dObj = null;
            }
        },
        mySceneGroup: null,
        sceneAdd: function (obj) {
            // let's add our Eagle BRD content outside the scope of the Gcode content
            // so that we have it stay while the Gcode 3D Viewer still functions
            if (this.mySceneGroup == null) {
                this.mySceneGroup = new THREE.Group();
                this.obj3d.add(this.mySceneGroup);
            }
            this.mySceneGroup.add(obj);
            // you need to wake up the 3d viewer to see your changes
            // it sleeps automatically after 5 seconds to convserve CPU
            this.obj3dmeta.widget.wakeAnimate();
        },
        sceneRemove: function (obj) {
            console.log('DSP mySceneGroup', this.mySceneGroup);
            if (this.mySceneGroup != null){
                this.mySceneGroup.children.forEach(function(child){
                    child.visible = false; 
                });
            }
            //this.mySceneGroup.remove(obj);
            this.obj3dmeta.widget.wakeAnimate();
        },
        /**
         * User options are available in this property for reference by your
         * methods. If any change is made on these options, please call
         * saveOptionsLocalStorage()
         */
        options: null,
        /**
         * Call this method on init to setup the UI by reading the user's
         * stored settings from localStorage and then adjust the UI to reflect
         * what the user wants.
         */
        setupUiFromLocalStorage: function() {

            // Read vals from localStorage. Make sure to use a unique
            // key specific to this widget so as not to overwrite other
            // widgets' options. By using this.id as the prefix of the
            // key we're safe that this will be unique.

            // Feel free to add your own keys inside the options 
            // object for your own items

            var options = localStorage.getItem(this.id + '-options');
            
            
            if (options) {
                options = $.parseJSON(options);
                console.log("just evaled options: ", options);
            }
            else {
                options = {
                    //showBody: true,
                    tabShowing: 1,
                };
            }

            this.options = options;
            console.log("options:", options);

            // init ui 
            var that = this;            

            // Setup canulla diameter
            for(var i = 0;i<=9;i++){
               $('#' + this.id + ' .dropdown-menu a').eq(i).click(that.setCanullaDiameter.bind(this)).prop('href', 'javascript:');
            }


            // register input field 'safetyHeight' to change and options
            that.reginput('dispenserAxis');
            that.reginput('cannulaDiameter');
            that.reginput('startreleaseoffset');
            that.reginput('DispenserXoffset');
            that.reginput('DispenserYoffset');
            
            that.reginput();
        },
        /**
         * Register input field as change event and as entry in this.options.
         * also recognize loaded data from localspace (options)
         */
        reginput: function(field){
            var el = $('#' + this.id);

            if(field !== undefined){
                // get field input from user and register a changed event
                var that = this;
                el.find('.' + field).change(function(evt) {
                    console.log("evt:", evt);
                    var value = evt.currentTarget.value;
                    that.options[field] = that.getValue(value, that[field]);
                    console.log(that.options);
                    that.saveOptionsLocalStorage();
                });
            }
            else {
                console.log('Options', this.options );
                for(var key in this.options){
                    // read from options, set and trigger change
                    el.find('.' + key).val(this.setValue(this.options[key], key));
                }
            }
        },
        setValue: function(value){
            if( $.type(value) == 'array' )
                return value.join(',');

            if( $.type(value) == 'boolean' )
                return (value ? true : false);
            
            return value;
        },
        getValue: function(value, entry){
            if( $.type(entry) == 'array' )
                return value.split(',');

            if( $.type(entry) == 'number' )
                return parseFloat(value);

            if( $.type(entry) == 'string' )
                return value;

            if( $.type(entry) == 'boolean' )
                return (value ? true : false);
            
            return value;
        },
        /**
         * When a user changes a value that is stored as an option setting, you
         * should call this method immediately so that on next load the value
         * is correctly set.
         */
        saveOptionsLocalStorage: function() {
            // You can add your own values to this.options to store them
            // along with some of the normal stuff like showBody
            var options = this.options;

            // save all changed data to root object
            for(var key in options){
                this[key] = options[key];
            }
            var optionsStr = JSON.stringify(options);
            console.log("saving options:", options, "json.stringify:", optionsStr);
            // store settings to localStorage
            localStorage.setItem(this.id + '-options', optionsStr);
        },
        /**
         * This method loads the pubsubviewer widget which attaches to our 
         * upper right corner triangle menu and generates 3 menu items like
         * Pubsub Viewer, View Standalone, and Fork Widget. It also enables
         * the modal dialog that shows the documentation for this widget.
         * 
         * By using chilipeppr.load() we can ensure that the pubsubviewer widget
         * is only loaded and inlined once into the final ChiliPeppr workspace.
         * We are given back a reference to the instantiated singleton so its
         * not instantiated more than once. Then we call it's attachTo method
         * which creates the full pulldown menu for us and attaches the click
         * events.
         */
        forkSetup: function() {
            var topCssSelector = '#' + this.id;

            $(topCssSelector + ' .panel-title').popover({
                title: this.name,
                content: this.desc,
                html: true,
                delay: 1000,
                animation: true,
                trigger: 'hover',
                placement: 'auto'
            });

            var that = this;
            chilipeppr.load("http://fiddle.jshell.net/chilipeppr/zMbL9/show/light/", function() {
                require(['inline:com-chilipeppr-elem-pubsubviewer'], function(pubsubviewer) {
                    pubsubviewer.attachTo($(topCssSelector + ' .panel-heading .dropdown-menu'), that);
                });
            });

        },
    }
});