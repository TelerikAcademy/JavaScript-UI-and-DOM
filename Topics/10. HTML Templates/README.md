<!-- attr: { hasScriptWrapper:true, id:"title" class:"slide-title" } -->
    <h1>HTML Templates with Handlebars.js</h1>
    <h2>Making JavaScript code by template!</h2>
    <aside class="signature">
        <p class="signature-course">JavaScript DOM & UI</p>
        <p class="signature-initiative">Telerik Software Academy</p>
        <a href="http://academy.telerik.com" class="signature-link">http://academy.telerik.com</a>
    </aside>
<!-- attr: { hasScriptWrapper:true } -->
    <script type="text/template">
        # Table of Contents
        - HTML Templates
        - Handlebars.js Template Engine
          - Setup and usage
        - Creating Templates
          - Binding values to HTML
        - Handlebars Expressions
          - Block and conditional
        - Helpers
    </script>

<!-- HTML Templates Overview-->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-section" id:"html-templates-overview" } -->
        <script type="text/template">
            # HTML Templates
            ## Overview
        </script>
<!-- attr: { hasScriptWrapper:true } -->
        <script type="text/template">
            # HTML Templates
            - HTML templates or template engines:
              - Make the HTML dynamic
                - Allow programming logic inside the otherwise static HTML
              - Provide cleaner and more sustainable way to dynamically create DOM elements
            - HTML templates are many:
              - Basic: Handlebars.js, mustache.js, underscore.js, jQuery templates
              - Advanced: KendoUI, AngularJS
        </script>

 <!-- Handlebars.js -->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-section" id:"handlebarsjs-overview" } -->
        <script type="text/template">
            # Handlebars.js Overview
            ## Setup and basics
        </script>
<!-- attr: { hasScriptWrapper:true } -->
        <script type="text/template">
            # Handlebars.js Overview
            - Handlebars.js is an open-source template engine
              - Provides both **run-time and compiled templates** for rendering HTML
              - Allows **one-way data-binding** of HTML elements to JavaScript objects
              - Produces HTML code based on **a template** and a given **JavaScript object**
        </script>
    <!-- section start -->
      <h1>Handlebars.js: Setup and Usage</h1>
      <ul>
        <li>To use Handlebars follow the steps:
          <ul>
            <li>Acquire handlerbars.js:
              <ul>
                <li>From the site at<br/>
                    <a href="http://handlebarsjs.com/" title="http://handlebarsjs.com/">http://handlebarsjs.com/</a>
                </li>
                <li>Using bower:<br/>
                  <pre><code>$ bower install handlebars</code></pre>
                </li>
                <li>Src the script in the HTML file:
                  <pre><code><script src="path/to/handlebars.js"></script></code></pre>
                </li>
              </ul>
          </li>
        </ul>
      </li>
    </ul>
<!-- attr: { hasScriptWrapper:true, style:"font-size: 40px" } -->
        <script type="text/template">
            # Handlebars.js: Setup and Usage
            - (cont.) To use Handlebars follow the steps:
              - Create a template
              - In a script tag with invalid type attribute

                  <div class='post'>
                    <h1 class="post-title">{{title}}</h1>
                    <p class="post-content">{{{content}}}</p>
                  </div>

              - Render the template with JavaScript:

                var post = {title: '…', content: '…'},
                    htmlTemplate = postTemplateNode.innerHTML,
                    postTemplate = Handlebars.compile(htmlTemplate),
                postNode.innerHTML = postTemplate(post);
        </script>
<!-- attr: { hasScriptWrapper:true, class:"slide-section"  } -->
        <script type="text/template">
            # Setup and Usage
            ## Live Demo
        </script>

<!-- Templates with Handlebars.js -->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true,  class:"slide-section" id:"creating-templates" } -->
    <script type="text/template">
      # Creating HTML Templates with Handlebars.js
      ## Start from the beginning
    </script>

<!-- attr: { hasScriptWrapper:true, style:"font-size:45px" } -->
    <script type="text/template">
      # Templates with Handlebars.js
      - HTML templates act much like `string.Format()` in **C# ** and **Java** and `stringWithFormat: @"…"` in **Objective-C**
        - Put placeholders within a template string, and replace these placeholders with values
      - Handlebars.js marks placeholders with **double curly brackets** `{{value}}`
        - When rendered, **the placeholders** between the curly brackets are **replaced with the corresponding value**
    </script>
<!-- attr: { hasScriptWrapper:true,  style:"font-size:45px" } -->
    <script type="text/template">
      # Handlebars.js Templates Example <!-- .element: style="font-size:1.2em" -->
        - Creating the Template

              <div class='post'>
                <h1 class="post-title">{{title}}</h1>
                <p class="post-content">{{content}}</p>
              </div>
        - Create the **JavaScript object** and render the template to **produce pure HTML** code

              var post = { title: ' ... ', content: ' ... ' },
                  tmplStr = document.getElementById('...').innerHTML
                  template = Handlebars.compile(tmplStr);
              domNode.innerHTML = template(post);
    </script>
<!-- attr: { hasScriptWrapper:true, class:"slide-section"  } -->
      <script type="text/template">
          # Creating Handlebars Templates
          ## Live Demo
      </script>
<!-- attr: { hasScriptWrapper:true } -->
    <script type="text/template">
      # HTML Escaping
      - Handlebars.js escapes all values before rendering them
      - If the value should not be escaped there are two possibilities:
          - Use **triple curly brackets** in the template string:


          {{{value}}}


      - Mark in the value **not to be escaped**


           var post = { title: '…',
               content: new Handlebars.SafeString('…')
           };

        Mostly used with helpers <!-- .element: class="balloon fragment" style="top: 75%; right: 10%" -->
    </script>
<!-- attr: { hasScriptWrapper:true, class:"slide-section"  } -->
      <script type="text/template">
          # HTML Escaping
          ## Live Demo
      </script>

<!-- Handlebars Expressions-->

<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-section" id:"handlebars-expressions" } -->
    <script type="text/template">
      # Handlebars Expressions
      ## Blocks and Condtitionals
    </script>
<!-- attr: { hasScriptWrapper:true } -->
    <script type="text/template">
      # Handlebars Expressions
      - Handlebars.js supports expressions within the templates
        - Block expressions
          - For iterating over a collection of elements
        - Conditional expressions
    </script>
<!-- attr: { hasScriptWrapper:true } -->
    <script type="text/template">
      # Block Expressions
      - Block expressions are used to iterate over a collection of objects (like array)
        - Created using `{{# collection}}` and `{{/collection}}`
          - Everything between will be evaluated for each object in the collection

          <ul class="categories-list">
            {{# categories}}
              <li class="category-item">
                <a href="# /categories/{{id}}">{{name}}</a>
              </li>
            {{/categories}}
          </ul>

      The id and the name of every object <!-- .element: class="fragment balloon" style="top: 80%; right: 15%" -->

    </script>
<!-- attr: { hasScriptWrapper:true, class:"slide-section" } -->
    <script type="text/template">
      # Block Expressions
      ## Live Demo
    </script>
<!-- attr: { hasScriptWrapper:true } -->
    <script type="text/template">
      # Conditional Expressions
      - Render code only if a condition is fulfulled
        - Using `{{# if condition}}` `{{/if}}` or `{{#unless condition}} {{/unless}}`


          <h1>Posts</h1>
          <ul class="posts">
            {{# posts}}
              <li>
                <strong>
                  <a href="# /posts/{{id}}">{{title}}</a>
                </strong>
                {{# if author}}
                  <span class="author">by {{author}}</span>
                {{/if}}
              </li>
           {{/posts}}
          </ul>


      If author is false-like value,  this code will not be rendered <!-- .element: class="fragment balloon" style="top:61%; right: 8%" -->
    </script>
<!-- attr: { hasScriptWrapper:true, class:"slide-section" } -->
    <script type="text/template">
      # Conditional Expressions
      ## Live Demo
    </script>


<!-- Handlebars Helpers-->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-section" id:"handlebarsjs-helpers" } -->
    <script type="text/template">
      # Handlebars.js Helpers
      ## Helping you even more!
    </script>
<!-- attr: { hasScriptWrapper:true } -->
    <script type="text/template">
      # Handlebars.js Helpers
      - Handlebars.js helpers are like functions that do a predefined job
      - Built-in helpers:
        - `{{# each collection}} {{/each}}`
          - Much like block expressions but with more control like `{{@index}}` and `{{this}}`
        - `{{# with obj}} {{/with}}`
          - Used to shorten the path of property names
          - Write `{{prop}}` instead of `{{obj.prop}}`
    </script>
<!-- attr: { hasScriptWrapper:true, class:"slide-section" } -->
    <script type="text/template">
      # Handlebars.js Helpers
      ## Live Demo
    </script>
<!-- attr: { hasScriptWrapper:true } -->
    <script type="text/template">
      # Registering Custom Helpers
      - Handlebars.js supports extension of the built-in helpers
        - Using `Handlebars.registerHelper(…)`;


          Handlebars.registerHelper ('tags', function(tags){
            var html = '<ul class="tags-list">',
                tag;
            for(tag in tags){
              html += '<li class="tag">' + tag + '</li>';
            }
            return new Handlebars.SafeString(html);
          });


      SafeString is mandatory here  <!-- .element: class="balloon fragment" style="top:70%; right: 20%" -->

      Otherwise the result will be escaped  <!-- .element: class="balloon fragment"  style="top:75%; right: 10%" -->
    </script>
<!-- attr: { hasScriptWrapper:true, class:"slide-section" } -->
    <script type="text/template">
      # Registering Handlebars.js Helpers
      ## Live Demo
    </script>

<!-- Questions -->
<!-- attr: { hasScriptWrapper:true, class:"slide-questions" id:"questions" } -->
 <script type="text/template">
    # HTML Templates
    ## Questions
 </script>
