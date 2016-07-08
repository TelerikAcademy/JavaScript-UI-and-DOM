<!-- section start -->
<!-- attr: { hasScriptWrapper:true, id:"title" class:"slide-title" } -->
<h1>HTML Templates with Handlebars.js</h1>
<h2>Making JavaScript code by template!</h2>
<aside class="signature">
    <p class="signature-course">JavaScript DOM & UI</p>
    <p class="signature-initiative">Telerik Software Academy</p>
    <a href="http://academy.telerik.com" class="signature-link">http://academy.telerik.com</a>
</aside>

<!-- attr: { hasScriptWrapper:true } -->
# Table of Contents
- HTML Templates
- Handlebars.js Template Engine
  - Setup and usage
- Creating Templates
  - Binding values to HTML
- Handlebars Expressions
  - Block and conditional
- Helpers

<!-- HTML Templates Overview-->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-section" id:"html-templates-overview" } -->
# HTML Templates
## Overview

<!-- attr: { hasScriptWrapper:true } -->
# HTML Templates
- HTML templates or template engines:
  - Make the HTML dynamic
    - Allow programming logic inside the otherwise static HTML
  - Provide cleaner and more sustainable way to dynamically create DOM elements
- HTML templates are many:
  - Basic: Handlebars.js, mustache.js, underscore.js, jQuery templates
  - Advanced: KendoUI, AngularJS

<!-- Handlebars.js -->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-section" id:"handlebarsjs-overview" } -->
# Handlebars.js Overview
## Setup and basics

<!-- attr: { hasScriptWrapper:true } -->
# Handlebars.js Overview
- Handlebars.js is an open-source template engine
  - Provides both **run-time and compiled templates** for rendering HTML
  - Allows **one-way data-binding** of HTML elements to JavaScript objects
  - Produces HTML code based on **a template** and a given **JavaScript object**

<!-- attr: { hasScriptWrapper:true } -->
# Handlebars.js: Setup and Usage
- To use Handlebars follow the steps:
  - Acquire handlerbars.js:
    - From the site at<br/>
	  <a href="http://handlebarsjs.com/" title="http://handlebarsjs.com/">http://handlebarsjs.com/</a>
    - Using bower:<br/>
    ```
	bower install handlebars
	```
    - Src the script in the HTML file:
    ```
	<script src="path/to/handlebars.js"></script></code></pre>
	```

<!-- attr: { hasScriptWrapper:true, style:"font-size: 40px" } -->
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

<!-- attr: { hasScriptWrapper:true, class:"slide-section"  } -->
# Setup and Usage
## Live Demo

<!-- Templates with Handlebars.js -->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true,  class:"slide-section" id:"creating-templates" } -->
# Creating HTML Templates with Handlebars.js
## Start from the beginning

<!-- attr: { hasScriptWrapper:true, style:"font-size:45px" } -->
# Templates with Handlebars.js
- HTML templates act much like `string.Format()` in **C#** and **Java** and `stringWithFormat: @"…"` in **Objective-C**
  - Put placeholders within a template string, and replace these placeholders with values
- Handlebars.js marks placeholders with **double curly brackets** `{{value}}`
  - When rendered, **the placeholders** between the curly brackets are **replaced with the corresponding value**

<!-- attr: { hasScriptWrapper:true,  style:"font-size:45px" } -->
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

<!-- attr: { hasScriptWrapper:true, class:"slide-section"  } -->
# Creating Handlebars Templates
## Live Demo

<!-- attr: { hasScriptWrapper:true } -->
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

<!-- attr: { hasScriptWrapper:true, class:"slide-section"  } -->
# HTML Escaping
## Live Demo

<!-- Handlebars Expressions-->

<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-section" id:"handlebars-expressions" } -->
# Handlebars Expressions
## Blocks and Condtitionals

<!-- attr: { hasScriptWrapper:true } -->
# Handlebars Expressions
- Handlebars.js supports expressions within the templates
  - Block expressions
    - For iterating over a collection of elements
  - Conditional expressions

<!-- attr: { hasScriptWrapper:true } -->
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

<!-- attr: { hasScriptWrapper:true, class:"slide-section" } -->
# Block Expressions
## Live Demo

<!-- attr: { hasScriptWrapper:true } -->
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

<!-- attr: { hasScriptWrapper:true, class:"slide-section" } -->
# Conditional Expressions
## Live Demo

<!-- Handlebars Helpers-->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-section" id:"handlebarsjs-helpers" } -->
# Handlebars.js Helpers
## Helping you even more!

<!-- attr: { hasScriptWrapper:true } -->
# Handlebars.js Helpers
- Handlebars.js helpers are like functions that do a predefined job
- Built-in helpers:
  - `{{# each collection}} {{/each}}`
    - Much like block expressions but with more control like `{{@index}}` and `{{this}}`
  - `{{# with obj}} {{/with}}`
    - Used to shorten the path of property names
    - Write `{{prop}}` instead of `{{obj.prop}}`

<!-- attr: { hasScriptWrapper:true, class:"slide-section" } -->
# Handlebars.js Helpers
## Live Demo

<!-- attr: { hasScriptWrapper:true } -->
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

<!-- attr: { hasScriptWrapper:true, class:"slide-section" } -->
# Registering Handlebars.js Helpers
## Live Demo

<!-- Questions -->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-questions" id:"questions" } -->
# HTML Templates
## Questions
