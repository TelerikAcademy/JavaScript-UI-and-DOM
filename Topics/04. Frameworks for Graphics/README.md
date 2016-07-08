<!-- section start -->
<!-- attr: { hasScriptWrapper:true, id:"title" class:"slide-title" } -->
<h1>Frameworks for Graphics</h1>
<h2>Easier working with Canvas</h2>
<aside class="signature">
    <p class="signature-course">JavaScript DOM & UI</p>
    <p class="signature-initiative">Telerik Software Academy</p>
    <a href="http://academy.telerik.com" class="signature-link">http://academy.telerik.com</a>
</aside>

<!-- Table of Contents -->
<!-- attr: { hasScriptWrapper:true, id:"table-of-contents" data-markdown style:"font-size:40px" } -->
# Table of Contents
- KineticJS overview and setup
    - Working with KineticJS
    - Initializing canvas
- Drawing shapes
    - Rects, circles, paths, blobs
- Event handlers
    - Attaching click, drag&drop

<!-- SVG Overview -->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true, id:"svg-overview" class:"slide-section" } -->
# KineticJS
## Overview and Setup

<!-- attr: { hasScriptWrapper:true } -->
# KineticJS Overview
- KineticJS is a JavaScript framework to work with the Canvas
    - Introduces a refined API for canvas functionality
    - Has stages and layers for better canvas performance
        - Layers contain different sets of objects that can be used together

<!-- attr: { hasScriptWrapper:true, style:"font-size: 45px" } -->
<h1>KineticJS Setup</h1>
<ul>
    <li>To use KineticJS:</li>
    <li>Download the kinetic.js framework from the site</li>
    <li>At <a href="http://kineticjs.com/" title="http://kineticjs.com/">http://kineticjs.com/</a></li>
    <li>Include the framework into your HTML page:</li>
</ul>
<pre><code><script src="scripts/…/kinetic-vX.X.X.js"></script></code></pre>
<ul>
    <li>Create a div with ID, where you want the canvas to be initialized:</li>
</ul>
<pre><code><div id="canvas-container"></div></code></pre>

<!-- attr: { hasScriptWrapper:true } -->
# KineticJS Setup
- To use KineticJS (cont.):
    - Do the following in the script:

    function initKinetic(){
        var stage = new Kinetic.Stage({
          container: 'canvas-container',
          width: 450,
          height: 350
        });
        var layer = new Kinetic.Layer();
        var rect = new Kinetic.Rect(options);
        var circle = new Kinetic.Circle(options);
        layer.add (rect);
        layer.add (circle);
        stage.add(layer);
    }

<!-- attr: { hasScriptWrapper:true, class:"slide-section" } -->
# Setting up KineticJS
## Live Demo

<!-- Drawing shapes -->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-section" id:"drawing-shapes" } -->
# Drawing Shapes with KineticJS
## Rects, Circles, Line, etc...

<!-- attr: { hasScriptWrapper:true } -->
<h1>Drawing Shapes with KineticJS</h1>
<ul>
    <li>KineticJS has all the default shapes from Canvas, and some more:</li>
</ul>
<table>
    <tr>
        <td style="border: none; width: 50%">Rectangular</td>
        <td  style="border: none; width: 50%">Circle</td>
    </tr>
    <tr>
        <td>
            <pre><code>rect = new Kinetic.Rect({
  fill: 'yellowgreen',
  stroke: '# CCCCCC',
  x: 250,
  y: 350,
  width: 57,
  height: 93
});</code></pre>
                </td>
                <td>
                    <pre><code>circle = new Kinetic.Circle({
  radius: 45,
  fill: 'purple',
  stroke: 'blue',
  strokeWidth: 3,
  x: 450,
  y: 350,
});</code></pre>
                </td>
            </tr>
        </table>

<!-- attr: { hasScriptWrapper:true } -->
<h1>Drawing Shapes with KineticJS</h1>
<ul>
    <li>KineticJS has all the default shapes from Canvas, and some more:</li>
</ul>
<table>
    <tr>
        <td style="border: none; width: 50%">Straight line</td>
        <td  style="border: none; width: 50%">Curved line</td>
    </tr>
    <tr>
        <td>
            <pre><code>straight = new Kinetic.Line({
  points: [x1, y1, x2, y2],
  stroke: 'green',
  strokeWidth: 2,
  lineJoin: 'round'
});</code></pre>
                </td>
                <td>
                    <pre><code>curved = new Kinetic.Line({
  points: [x1, y1, x2, y2],
  stroke: 'green',
  strokeWidth: 2,
  tension: 1
});</code></pre>
                </td>
            </tr>
        </table>

<!-- attr: { hasScriptWrapper:true } -->
<h1>Drawing Shapes with KineticJS</h1>
<ul>
    <li>KineticJS has all the default shapes from Canvas, and some more:</li>
</ul>
<table>
    <tr>
        <td style="border: none; width: 50%">Polygon</td>
        <td  style="border: none; width: 50%">Blob</td>
    </tr>
    <tr>
        <td>
            <pre><code>polygon = new Kinetic.Line({
  points: [ … ]
  stroke: 'green',
  fill: 'yellowgreen'
  strokeWidth: 2,
  closed: true
});</code></pre>
                </td>
                <td>
                    <pre><code>blob = new Kinetic.Line({
  points: [ … ],
  stroke: 'green',
  fill: 'purple',
  closed: true,
  tension: 0.5
});</code></pre>
                </td>
            </tr>
        </table>

<!-- attr: { hasScriptWrapper:true, class:"slide-section" } -->
# Drawing Shapes
## Live Demo

<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-questions" id:"questions" } -->
# KineticJS Overview
## Questions
