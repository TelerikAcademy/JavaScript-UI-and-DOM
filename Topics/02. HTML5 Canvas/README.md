<!-- attr: { hasScriptWrapper:true, id:"title" class:"slide-title" } -->
    <h1>The HTML5 Canvas</h1>
    <h2>Low-level graphics in the Web</h2>
    <aside class="signature">
        <p class="signature-course">JavaScript DOM & UI</p>
        <p class="signature-initiative">Telerik Software Academy</p>
        <a href="http://academy.telerik.com" class="signature-link">http://academy.telerik.com</a>
    </aside>

<!-- Table of Contents -->
<!-- attr: { hasScriptWrapper:true, id:"table-of-contents" data-markdown style:"font-size:40px" } -->
    <script type="text/template">
    # Table of Contents
    - Overview and usage of the canvas
    - Drawing shapes
        - Rectangles, arcs and ellipses
        - Lines, paths and Bézier curves
    - Drawing Text
    - Per-pixel manipulations
    - Canvas styles
        - `fillColor` and `strokeColor`
        - Gradients, patterns and shadows
    - Transformations
        - Save and restore context state
        - Translate
    </script>

<!-- The HTML5 Canvas -->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true, id:"html5-canvas" data-markdown class:"slide-section" } -->
        <script type="text/template">
            # The HTML5 Canvas
            ## The way of the graphics in web
        </script>
<!-- attr: { hasScriptWrapper:true } -->
        <script type="text/template">
        # The HTML5 Canvas
        - The Canvas is the way to draw in the browser
            - Uses JavaScript for the drawing
            - Enables high-performance drawing
        - The Canvas is part of the HTML5 specification
            - Supported in most browsers
                - Both desktop and mobile
        </script>
<!-- attr: { hasScriptWrapper:true } -->
        <script type="text/template">
        # Using the Canvas
        - The Canvas is a rectangular sheet
            - All the drawing is done inside this sheet
        - The canvas consists of:
            - `<canvas>` HTML element
            - JavaScript API for the drawing

            <canvas id="the-canvas" width="100" height="100" />

        <p></p>

            var canvas = document.getElementById('the-canvas');
            var canvasCtx = canvas.getContext('2d');
            canvasCtx.fillRect(10, 10, 30, 30);

        - Set width and height <!-- .element: style="top:48%; left: 70%" class="fragment balloon" -->
        </script>
<!-- attr: { hasScriptWrapper:true } -->
        <script type="text/template">
            # The HTML5 Canvas Context
            - The canvas HTML element provides many ways for drawing
                - Rectangular 2d drawing
                - 3d drawing
                - WebGL drawing
            - HTML5 provides APIs for all these types of drawing
             - The way to use a specific canvas API is to get the corresponding context
        </script>
<!-- attr: { hasScriptWrapper:true, class:"slide-section" } -->
        <script type="text/template">
            # Using the HTML5 Canvas
            ## Live Demo
        </script>

<!-- Drawing Shapes -->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true, id:"drawing-shapes" data-markdown class:"slide-section" } -->
        <script type="text/template">
            # Drawing Shapes
            ## Rects, Arcs, Ellipses
        </script>
<!-- attr: { hasScriptWrapper:true } -->
        <script type="text/template">
            # Canvas Shapes
            - The Canvas provides ways to draw all kinds of shapes
                - Rects, arcs, ellipses, lines, etc…
            - Each of these shapes can be either
                - Drawn in full color (i.e. filled)
                - Drawn only their border (i.e. stroked)


                var canvas = document.getElementById('the-canvas');
                var canvasCtx = canvas.getContext('2d');
                canvasCtx.fillRect(10, 10, 25, 25);
                canvasCtx.strokeRect(10, 10, 25, 25);
        </script>
<!-- attr: { hasScriptWrapper:true } -->
        <script type="text/template">
            # Drawing Rects
            - Drawing rects is the simplest way to draw with the canvas
                - Build-in functionality
                - `context.fillRect (x, y, width, height)` <!-- .element: style="font-size: 0.9em" -->
                    - Creates a rectangular shape at position (x, y) from the top left corner of the canvas
                    - The shape is drawn in full color
                - `context.strokeRect (x, y, width, height)` <!-- .element: style="font-size: 0.9em" -->
                    - Same as fillRect
                    - Only the border of the shape is drawn
        </script>
    <!-- section start -->
        <h1>Drawing Rects: Example</h1>
        <ul>
            <li>Drawing a rectangle filled with light blue and with dark blue border</li>
        </ul>
        <pre><code><canvas id="rects-canvas"> </canvas></code></pre>
        <pre><code>var canvas = document.getElementById('rects-canvas'),
    ctx = canvas.getContext('2d');
ctx.fillStyle = 'rgb(107, 187, 201)';
ctx.strokeStyle = 'rgb(2, 55, 155)';
ctx.fillRect(20, 20, 140, 90);
ctx.strokeRect(20, 20, 140, 90);</code></pre>
<!-- attr: { hasScriptWrapper:true, class:"slide-section" } -->
        <script type="text/template">
            # Drawing Rects
            ## Live Demo
        </script>

<!-- Canvas Paths -->

<!-- section start -->
<!-- attr: { hasScriptWrapper:true, id:"canvas-paths" data-markdown class:"slide-section" } -->
        <script type="text/template">
            # Canvas Paths
            ## Drawing arcs and lines
        </script>
<!-- attr: { hasScriptWrapper:true } -->
        <script type="text/template">
            # Canvas Paths
            - The Canvas can do much more than just drawing rectangles
                - Bezier curves, ellipses, arcs
                - Much of the power of the Canvas comes from the path
            - The path is just a set of connected dots
                - Depending on the method used, the dots can be connected using straight line or curve
        </script>
<!-- attr: { hasScriptWrapper:true } -->
        <script type="text/template">
            # Canvas Paths (2)
            - The canvas context has methods for paths:
                - beginPath()
                    - Starts path
                - `moveTo(x, y)`
                    - Changes the position of the path marker
                - `lineTo(x, y)`
                    - Draws a straight line from the position of the path marker to position (x, y)
                - `fill()` / `stroke()`
                    - Fills or strokes the path
        </script>
<!-- attr: { hasScriptWrapper:true, style:"font-size: 45px" } -->
        <script type="text/template">
            # How the Canvas Works?
            - The canvas only marks dots on the canvas sheet
                - And remembers how these dots are connected
                - When `fill()` or `stroke()` is reached, all dots are connected at once

            <img src="imgs/canvas-path-demo.png" height="330px" style="float:right; margin-top: -10px; margin-left:15px"/>

                ctx.beginPath();
                ctx.lineTo(200, 50);
                ctx.lineTo(50, 50);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(200, 50);
                ctx.lineTo(200,300);
                ctx.lineTo(50, 300);
                ctx.closePath();
                ctx.fill();

        </script>
<!-- attr: { hasScriptWrapper:true, class:"slide-section" } -->
        <script type="text/template">
            # Using the Path
            ## Live Demo
        </script>

<!-- Drawing Ellipses -->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true, id:"drawing-ellipses" data-markdown class:"slide-section" } -->
        <script type="text/template">
            # Drawing Ellipses
            ## Using the path
        </script>
<!-- attr: { hasScriptWrapper:true } -->
        <script type="text/template">
            # Drawing Ellipses
            - The Canvas has a built-in methods for drawing ellipses
            - arc(x, y, radius, from, to, counterclockwise)
            - Draws a circle with center at (x, y) from position "from" to position "to"
            - Positions in ellipses are described using radians (degrees)
            - The degrees to radians formula is:
                - **`radians = degrees * PI/180`**
        </script>
<!-- attr: { hasScriptWrapper:true } -->
        <script type="text/template">
            # Degrees and Radians
            <div style="text-align: center; padding-top:5px">
                <img src="imgs/degrees-radians.png" width="600px"/>
            </div>
        </script>
<!-- attr: { hasScriptWrapper:true, style:"font-size: 40px" } -->
        # Drawing Ellipses: Example
        - To draw ellipses, a path must be started:


            ctx.beginPath();

        - Draw a full circle:


            //clockwise
            ctx.arc(x, y, r, 0, 2- Math.PI);
            //counter clockwise
            ctx.arc(x, y, r, 2- Math.PI, 0, true);

        - Draw a segment of an ellipse:


            //The smaller part (clockwise)
            ctx.arc(x, y, r, Math.PI/2, 2- Math.PI);

            //the bigger part (counterclockwise)
            ctx.arc(x, y, r, Math.PI/2, 2- Math.PI, true);
<!-- attr: { hasScriptWrapper:true, class:"slide-section" } -->
        <script type="text/template">
            # Drawing Ellipses and Segments
            ## Live Demo
        </script>
<!-- attr: { hasScriptWrapper:true, style:"font-size: 40px" } -->
        <script type="text/template">
            # Drawing Circular Sectors
            - A circular sector is the portion of a circle enclosed by two radiuses
            - The Canvas has no built-in methods for creating circular sectors
               - Yet, the Canvas supports paths
            - A circle sector can be done by creating a sector and then a line to the center of the circle

            <div style="text-align: center">
                <img src="imgs/drawing-ellipses-sector-small.png" width="250" style="margin-right:20px"/>
                <img src="imgs/drawing-ellipses-sector-big.png" width="250" />
            </div>
        </script>
<!-- attr: { hasScriptWrapper:true,  } -->
        <script type="text/template">
            # Drawing Circular Sectors: Example
            - **context.closePath()** connects the first and the last dots from the Path


                function drawSector(x, y, r, from, to, isCounterClockwise) {
                  ctx.beginPath();
                  ctx.arc(x, y, r, from, to, isCounterClockwise);
                  ctx.lineTo(x, y);
                  ctx.closePath();
                  ctx.stroke();
                }
        </script>
<!-- attr: { hasScriptWrapper:true, class:"slide-section" } -->
        <script type="text/template">
            # Drawing Circular Sectors
            ## Live Demo
        </script>

<!-- Drawing Curves -->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true, id:"drawing-curves" data-markdown class:"slide-section" } -->
        <script type="text/template">
            # Drawing Curves
            ## Quadratic and Bezier
        </script>
<!-- attr: { hasScriptWrapper:true } -->
        <script type="text/template">
            # Drawing Curves with the Canvas
            - The Canvas supports two types of curves:
                - **Quadratic** curves
                    - A simple curve drawn based on a control point
                - **Bezier** curves
                    - A more complex curve based on two control points
            - Both quadratic and Bezier curves are done using a path
        </script>
<!-- attr: { hasScriptWrapper:true } -->
        <script type="text/template">
            # Quadratic Curves <!-- .element: style="margin-bottom: 45px" -->
            - Quadratic curves are basic curves
                - Using **two context points** and a **control point**
                    - The first is the last point from the path (sx, sy)
                    - The second is the one from the curve (cx, cy)
                - `context.quadraticCurveTo(cx, cy, ex, ey)` <!-- .element: style="font-size: 0.9em" -->
            <div style="text-align: center">
                <img src="imgs/qudratic-curve-sample.png" width="450px" />
            </div>
        </script>
<!-- attr: { hasScriptWrapper:true, class:"slide-section" } -->
        <script type="text/template">
            # Quadratic Curves
            ## Live Demo
        </script>
<!-- attr: { hasScriptWrapper:true } -->
        <script type="text/template">
            # Bezier Curves <!-- .element: style="margin-bottom: 45px" -->
            - Bezier curves are like quadratic curves, but with **two context** and **two control** points

            <div style="text-align: center; margin-top: 15px">
                <img src="imgs/bezier-curve-sample.png" width="450px" style="border-radius: 15px; border: 1px solid black"/>
            </div>
        </script>
<!-- attr: { hasScriptWrapper:true, class:"slide-section" } -->
        <script type="text/template">
            # Bezier Curves
            ## Live Demo
        </script>

<!-- Drawing Text in canvas -->

<!-- section start -->
<!-- attr: { hasScriptWrapper:true, id:"drawing-text" data-markdown class:"slide-section" } -->
        <script type="text/template">
            # Drawing Text in Canvas
            ## With styles
        </script>
<!-- attr: { hasScriptWrapper:true } -->
        <script type="text/template">
            # Drawing Text
            - The HTML5 canvas can also **draw text**:
                - Methods:
                    - `context.fillText (text, x, y)` – fills the given text
                    - `context.strokeText (text, x, y)` – draws only the border of the text
                - Properties:
                    - `context.font` – sets the font size and font family of the text
                    - `context.fillStyle` – the fill color of the text
                    - `context.strokeStyle` – the stroke color of the text
        </script>
<!-- attr: { hasScriptWrapper:true } -->
        <script type="text/template">
            # Drawing Text: Example
            - Draw the text 'Telerik Academy'
                - Filled with **yellowgreen** color, stroked with **dark green** color
                - Font family – `Arial`
                - Font sizes – from `28px` to `48px`


                var minFontSize = '28';
                var currentFontSize = 48;
                while (minFontSize <= currentFontSize) {
                  ctx.font = currentFontSize + 'px ' + 'Arial';
                  ctx.fillText(text, x, y);
                  ctx.strokeText(text, x, y);
                  y += currentFontSize + offset;
                  currentFontSize -= 4;
                }

            <img class="fragment" src="imgs/drawing-text-demo.png" width="300" style="position: absolute; top: 30%; left: 70%" />
        </script>
<!-- attr: { hasScriptWrapper:true, class:"slide-section" } -->
        <script type="text/template">
            # Drawing Text in Canvas
            ## Live Demo
        </script>

<!-- Canvas Styles -->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true, id:"canvas-styles" data-markdown class:"slide-section" } -->
        <script type="text/template">
            # Canvas Styles
            ## Colors and Stuff
        </script>
<!-- attr: { hasScriptWrapper:true } -->
        <script type="text/template">
            # Canvas Styles
            - The canvas supports two styles
                - Styles for **fill** and **stroke**
                    - Can be either a solid color or pattern
                - Styles for **types of stroke**
                    - Dashed or solid
                    - Done using kind of workaround
        </script>
<!-- attr: { hasScriptWrapper:true, class:"slide-section" } -->
        <script type="text/template">
            # Canvas Styles
            ## Live Demo
        </script>

<!-- Canvas Transformations -->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true, id:"transformations" data-markdown class:"slide-section" } -->
        <script type="text/template">
            # Canvas Transformations
            ## scale(), rotate()
        </script>
<!-- attr: { hasScriptWrapper:true } -->
        <script type="text/template">
            # Canvas Transformations
            - The Canvas can do transformations
                - i.e. it can be rotated, scaled or transformed
            - `context.scale(dx, dy)` – all coordinates and points are scaled
                - `fillRect(X, X, W, H)` will draw a rectangle
                - At position **(dx * X, dy * Y)**
                - With width **(dx* W)** and height **(dy* H)**
            - `context.rotate(D)` – all drawing is rotated with angle **D degrees**
        </script>
<!-- attr: { hasScriptWrapper:true, class:"slide-section" } -->
        <script type="text/template">
            # Canvas Transformations
            ## Live Demo
        </script>


<!-- Per-pixel Manipulation -->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true, id:"per-pixel-manipulation" class:"slide-section" } -->
        <script type="text/template">
            # Canvas Per-pixel Manipulation
            ## Change only portions of the canvas
        </script>
<!-- attr: { hasScriptWrapper:true } -->
        <script type="text/template">
            # Canvas Per-pixel Manipulation
            - Canvas supports **per-pixel manipulation**
                - All the pixels can be **manipulated one-by-one**
            - Use the `context.getImageData(x, y, w, h)` <!-- .element: style="font-size: 40px" -->
                - Returns the image data object
                    - The image data is for the rectangle with **top-left corner at (x, y)** with **width w** and **height h**
                - The image data contains **an array of numbers** for each of the pixels
        </script>
<!-- attr: { hasScriptWrapper:true } -->
        <script type="text/template">
            # Canvas Per-pixel Manipulation (2)
            - The array of pixels holds values between `0` and `255`
                - Each value represents a **color component** from **RGBA**
                - The pixels are grouped in triples in the array
                - The color values for the **i-th pixel** are at positions:
                    - `pixels[i]` holds the **RED** component
                    - `pixels[i+1]` holds the **GREEN** component
                    - `pixels[i+2]` holds the **BLUE** component
        </script>
<!-- attr: { hasScriptWrapper:true } -->
        <script type="text/template">
            # Canvas Per-pixel Manipulation: Example
            - Invert all the colors of an canvas
                - Change each color component `CC` with `255-CC`


                var i,
                    len,
                    width = canvas.width,
                    height = canvas.height,
                    imageData = ctx.getImageData(150, 150, width, height),
                    data = imageData.data;
                for(i = 0, len = data.length; i < len; i+=4){
                    data[i+1] = 255 - data[i+1];
                    data[i] = 255 - data[i];
                    data[i+2] = 255 - data[i+2];
                }
                ctx.putImageData(imageData, 0, 0);
        </script>
<!-- attr: { hasScriptWrapper:true, class:"slide-section" } -->
        <script type="text/template">
            # Canvas Per-pixel Manipulations
            ## Live Demo
        </script>

<!-- attr: { hasScriptWrapper:true, id:"questions" class:"slide-questions" } -->
    <script type="text/template">
        # The HTML5 Canvas
        ## Questions
    </script>

