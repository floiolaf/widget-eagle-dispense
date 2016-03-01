# com-chilipeppr-widget-eagle-dispense
This add-on widget is a tab for the Eagle BRD widget that helps you generate gcode for dispense solderpaste drop's to a pcb.

![alt text](screenshot.png "Screenshot")

## ChiliPeppr Widget Add-On / Dispenser

All ChiliPeppr widgets/elements are defined using cpdefine() which is a method
that mimics require.js. Each defined object must have a unique ID so it does
not conflict with other ChiliPeppr widgets.

| Item                  | Value           |
| -------------         | ------------- | 
| ID                    | com-chilipeppr-widget-eagle-dispense |
| Name                  | Widget Add-On / Dispenser |
| Description           | This add-on widget is a tab for the Eagle BRD widget that helps you generate gcode for dispense solderpaste drop's to a pcb. |
| chilipeppr.load() URL | http://raw.githubusercontent.com/xpix/widget-eagle-dispense/master/auto-generated-widget.html |
| Edit URL              | http://ide.c9.io/xpix/widget-eagle-dispense |
| Github URL            | http://github.com/xpix/widget-eagle-dispense |
| Test URL              | https://preview.c9users.io/xpix/widget-eagle-dispense/widget.html |

## Example Code for chilipeppr.load() Statement

You can use the code below as a starting point for instantiating this widget 
inside a workspace or from another widget. The key is that you need to load 
your widget inlined into a div so the DOM can parse your HTML, CSS, and 
Javascript. Then you use cprequire() to find your widget's Javascript and get 
back the instance of it.

```javascript
// Inject new div to contain widget or use an existing div with an ID
$("body").append('<' + 'div id="myDivWidgetEagleDispense"><' + '/div>');

chilipeppr.load(
  "#myDivWidgetEagleDispense",
  "http://raw.githubusercontent.com/xpix/widget-eagle-dispense/master/auto-generated-widget.html",
  function() {
    // Callback after widget loaded into #myDivWidgetEagleDispense
    // Now use require.js to get reference to instantiated widget
    cprequire(
      ["inline:com-chilipeppr-widget-eagle-dispense"], // the id you gave your widget
      function(myObjWidgetEagleDispense) {
        // Callback that is passed reference to the newly loaded widget
        console.log("Widget Add-On / Dispenser just got loaded.", myObjWidgetEagleDispense);
        myObjWidgetEagleDispense.init();
      }
    );
  }
);

```

## Publish

This widget/element publishes the following signals. These signals are owned by this widget/element and are published to all objects inside the ChiliPeppr environment that listen to them via the 
chilipeppr.subscribe(signal, callback) method. 
To better understand how ChiliPeppr's subscribe() method works see amplify.js's documentation at http://amplifyjs.com/api/pubsub/

  <table id="com-chilipeppr-elem-pubsubviewer-pub" class="table table-bordered table-striped">
      <thead>
          <tr>
              <th style="">Signal</th>
              <th style="">Description</th>
          </tr>
      </thead>
      <tbody>
      <tr><td colspan="2">(No signals defined in this widget/element)</td></tr>    
      </tbody>
  </table>

## Subscribe

This widget/element subscribes to the following signals. These signals are owned by this widget/element. Other objects inside the ChiliPeppr environment can publish to these signals via the chilipeppr.publish(signal, data) method. 
To better understand how ChiliPeppr's publish() method works see amplify.js's documentation at http://amplifyjs.com/api/pubsub/

  <table id="com-chilipeppr-elem-pubsubviewer-sub" class="table table-bordered table-striped">
      <thead>
          <tr>
              <th style="">Signal</th>
              <th style="">Description</th>
          </tr>
      </thead>
      <tbody>
      <tr><td colspan="2">(No signals defined in this widget/element)</td></tr>    
      </tbody>
  </table>

## Foreign Publish

This widget/element publishes to the following signals that are owned by other objects. 
To better understand how ChiliPeppr's subscribe() method works see amplify.js's documentation at http://amplifyjs.com/api/pubsub/

  <table id="com-chilipeppr-elem-pubsubviewer-foreignpub" class="table table-bordered table-striped">
      <thead>
          <tr>
              <th style="">Signal</th>
              <th style="">Description</th>
          </tr>
      </thead>
      <tbody>
      <tr valign="top"><td>/com-chilipeppr-widget-eagle-dispense/com-chilipeppr-widget-3dviewer/request3dObject</td><td>We need to work with the 3D Viewer and inject content, so by sending out this signal the 3D viewer hears it and sends us back a /recv3dObject with the payload.</td></tr>    
      </tbody>
  </table>

## Foreign Subscribe

This widget/element publishes to the following signals that are owned by other objects.
To better understand how ChiliPeppr's publish() method works see amplify.js's documentation at http://amplifyjs.com/api/pubsub/

  <table id="com-chilipeppr-elem-pubsubviewer-foreignsub" class="table table-bordered table-striped">
      <thead>
          <tr>
              <th style="">Signal</th>
              <th style="">Description</th>
          </tr>
      </thead>
      <tbody>
      <tr valign="top"><td>/com-chilipeppr-widget-eagle-dispense/com-chilipeppr-widget-eagle/addGcode</td><td>This add-on subscribes to this signal so we can inject our own Gcode into the overall Eagle Widget gcode.</td></tr><tr valign="top"><td>/com-chilipeppr-widget-eagle-dispense/com-chilipeppr-widget-3dviewer/recv3dObject</td><td>We need to get the 3D Viewer so we can inject stuff into it. We must subscribe to this so when we call /request3dObject we get this signal back with the payload of the viewer.</td></tr>    
      </tbody>
  </table>

## Methods / Properties

The table below shows, in order, the methods and properties inside the widget/element.

  <table id="com-chilipeppr-elem-methodsprops" class="table table-bordered table-striped">
      <thead>
          <tr>
              <th style="">Method / Property</th>
              <th>Type</th>
              <th style="">Description</th>
          </tr>
      </thead>
      <tbody>
      <tr valign="top"><td>id</td><td>string</td><td>"com-chilipeppr-widget-eagle-dispense"<br><br>The ID of the widget. You must define this and make it unique.</td></tr><tr valign="top"><td>name</td><td>string</td><td>"Widget Add-On / Dispenser"</td></tr><tr valign="top"><td>desc</td><td>string</td><td>"This add-on widget is a tab for the Eagle BRD widget that helps you generate gcode for dispense solderpaste drop's to a pcb."</td></tr><tr valign="top"><td>url</td><td>string</td><td>"http://raw.githubusercontent.com/xpix/widget-eagle-dispense/master/auto-generated-widget.html"</td></tr><tr valign="top"><td>fiddleurl</td><td>string</td><td>"http://ide.c9.io/xpix/widget-eagle-dispense"</td></tr><tr valign="top"><td>githuburl</td><td>string</td><td>"http://github.com/xpix/widget-eagle-dispense"</td></tr><tr valign="top"><td>testurl</td><td>string</td><td>"http://widget-eagle-dispense-xpix.c9users.io/widget.html"</td></tr><tr valign="top"><td>cannulaDiameter</td><td>number</td><td>Dispenser VARIABLES.</td></tr><tr valign="top"><td>startreleaseoffset</td><td>number</td><td></td></tr><tr valign="top"><td>DispenserXoffset</td><td>number</td><td></td></tr><tr valign="top"><td>DispenserYoffset</td><td>number</td><td></td></tr><tr valign="top"><td>dispenserAxis</td><td>string</td><td>"X"</td></tr><tr valign="top"><td>gcodeOrderNumber</td><td>number</td><td></td></tr><tr valign="top"><td>renderedDrops</td><td>object</td><td></td></tr><tr valign="top"><td>colorsDrop</td><td>object</td><td></td></tr><tr valign="top"><td>options</td><td>object</td><td></td></tr><tr valign="top"><td>publish</td><td>object</td><td>Please see docs above.<br><br>Define the publish signals that this widget/element owns or defines so that
other widgets know how to subscribe to them and what they do.</td></tr><tr valign="top"><td>subscribe</td><td>object</td><td>Please see docs above.<br><br>Define the subscribe signals that this widget/element owns or defines so that
other widgets know how to subscribe to them and what they do.</td></tr><tr valign="top"><td>foreignPublish</td><td>object</td><td>Please see docs above.<br><br>Document the foreign publish signals, i.e. signals owned by other widgets
or elements, that this widget/element publishes to.</td></tr><tr valign="top"><td>foreignSubscribe</td><td>object</td><td>Please see docs above.<br><br>Document the foreign subscribe signals, i.e. signals owned by other widgets
or elements, that this widget/element subscribes to.</td></tr><tr valign="top"><td>eagleWidget</td><td>object</td><td>Holds the reference to the main Eagle Widget that we are an add-on for.</td></tr><tr valign="top"><td>init</td><td>function</td><td>function (eagleWidget) <br><br>All widgets should have an init method. It should be run by the
instantiating code like a workspace or a different widget.</td></tr><tr valign="top"><td>registerEvents</td><td>function</td><td>function ()<br><br>Register events in 3d space</td></tr><tr valign="top"><td>onMouseUp</td><td>function</td><td>function (event) </td></tr><tr valign="top"><td>injectTab</td><td>function</td><td>function () <br><br>Inject the solder mask tab into the Eagle Brd Widget</td></tr><tr valign="top"><td>isTabShowing</td><td>boolean</td><td></td></tr><tr valign="top"><td>dispense3d</td><td>object</td><td>Holds the DSP 3d object that we show in the 3D viewer.</td></tr><tr valign="top"><td>started</td><td>function</td><td>function ()<br><br>widget to know if startet or not.</td></tr><tr valign="top"><td>onTabShown</td><td>function</td><td>function () <br><br>When the user clicks to activate our tab, this event is called.</td></tr><tr valign="top"><td>onTabHide</td><td>function</td><td>function () <br><br>When the user clicks a different tab and this one gets hidden.</td></tr><tr valign="top"><td>drawdispense</td><td>function</td><td>function () <br><br>Iterate through the Eagle BRD dimensions XY coordinates and draw
a solder mask over the board.</td></tr><tr valign="top"><td>subscribeToAddGcodeSignal</td><td>function</td><td>function () <br><br>We subscribe to the main Eagle Widget's addGcode publish signal
so that we can inject our own Gcode to the main widget.</td></tr><tr valign="top"><td>subscribeToBeforeRender</td><td>function</td><td>function () <br><br>We subscribe to the main Eagle Widget's addGcode publish signal
so that we can inject our own Gcode to the main widget.</td></tr><tr valign="top"><td>onAddGcode</td><td>function</td><td>function (addGcodeCallback, gcodeParts, eagleWidget, helpDesc)<br><br>This is our callback that gets called when the /com-chilipeppr-widget-eagle/addGcode
signal is published by the main Eagle Widget. This is where we get to actually
inject our own Gcode to the final overall Gcode.</td></tr><tr valign="top"><td>onBeforeRender</td><td>function</td><td>function (self)<br><br>After Render Register all components and sort to the trays and pockets</td></tr><tr valign="top"><td>setCanullaDiameter</td><td>function</td><td>function (evt)</td></tr><tr valign="top"><td>namedDropGroups</td><td>object</td><td></td></tr><tr valign="top"><td>renderDispenserDrops</td><td>function</td><td>function (PARENT)</td></tr><tr valign="top"><td>exportGcodeDispenserDrop</td><td>function</td><td>function (drop, count, PARENT)</td></tr><tr valign="top"><td>exportGcodeDispenser</td><td>function</td><td>function (PARENT)</td></tr><tr valign="top"><td>get3dObj</td><td>function</td><td>function (callback) <br><br>return 3dobject from 3dviewer.</td></tr><tr valign="top"><td>get3dObjCallback</td><td>function</td><td>function (data, meta) </td></tr><tr valign="top"><td>mySceneGroup</td><td>object</td><td></td></tr><tr valign="top"><td>sceneAdd</td><td>function</td><td>function (obj) </td></tr><tr valign="top"><td>sceneRemove</td><td>function</td><td>function (obj) </td></tr><tr valign="top"><td>setupUiFromLocalStorage</td><td>function</td><td>function () <br><br>Call this method on init to setup the UI by reading the user's
stored settings from localStorage and then adjust the UI to reflect
what the user wants.</td></tr><tr valign="top"><td>reginput</td><td>function</td><td>function (field)<br><br>Register input field as change event and as entry in this.options.
also recognize loaded data from localspace (options)</td></tr><tr valign="top"><td>setValue</td><td>function</td><td>function (value)</td></tr><tr valign="top"><td>getValue</td><td>function</td><td>function (value, entry)</td></tr><tr valign="top"><td>saveOptionsLocalStorage</td><td>function</td><td>function () <br><br>When a user changes a value that is stored as an option setting, you
should call this method immediately so that on next load the value
is correctly set.</td></tr><tr valign="top"><td>forkSetup</td><td>function</td><td>function () <br><br>This method loads the pubsubviewer widget which attaches to our 
upper right corner triangle menu and generates 3 menu items like
Pubsub Viewer, View Standalone, and Fork Widget. It also enables
the modal dialog that shows the documentation for this widget.<br><br>By using chilipeppr.load() we can ensure that the pubsubviewer widget
is only loaded and inlined once into the final ChiliPeppr workspace.
We are given back a reference to the instantiated singleton so its
not instantiated more than once. Then we call it's attachTo method
which creates the full pulldown menu for us and attaches the click
events.</td></tr>
      </tbody>
  </table>


## About ChiliPeppr

[ChiliPeppr](http://chilipeppr.com) is a hardware fiddle, meaning it is a 
website that lets you easily
create a workspace to fiddle with your hardware from software. ChiliPeppr provides
a [Serial Port JSON Server](https://github.com/johnlauer/serial-port-json-server) 
that you run locally on your computer, or remotely on another computer, to connect to 
the serial port of your hardware like an Arduino or other microcontroller.

You then create a workspace at ChiliPeppr.com that connects to your hardware 
by starting from scratch or forking somebody else's
workspace that is close to what you are after. Then you write widgets in
Javascript that interact with your hardware by forking the base template 
widget or forking another widget that
is similar to what you are trying to build.

ChiliPeppr is massively capable such that the workspaces for 
[TinyG](http://chilipeppr.com/tinyg) and [Grbl](http://chilipeppr.com/grbl) CNC 
controllers have become full-fledged CNC machine management software used by
tens of thousands.

ChiliPeppr has inspired many people in the hardware/software world to use the
browser and Javascript as the foundation for interacting with hardware. The
Arduino team in Italy caught wind of ChiliPeppr and now
ChiliPeppr's Serial Port JSON Server is the basis for the 
[Arduino's new web IDE](https://create.arduino.cc/). If the Arduino team is excited about building on top
of ChiliPeppr, what
will you build on top of it?

