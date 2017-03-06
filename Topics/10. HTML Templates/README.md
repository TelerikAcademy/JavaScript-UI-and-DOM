<!-- section start -->
<!-- attr: { hasScriptWrapper:true, id:"title", class:"slide-title" } -->
# HTML Templates with Handlebars.js
## Making JavaScript code by template!

<aside class="signature">
    <p class="signature-course">JavaScript DOM & UI</p>
    <p class="signature-initiative">Telerik Software Academy</p>
    <a href="https://telerikacademy.com" class="signature-link">https://telerikacademy.com</a>
</aside>

<!-- attr: { hasScriptWrapper:true } -->
# Table of Contents
- [HTML Templates](#html-templates-overview)
- [Handlebars.js Template Engine](#handlebarsjs-overview)
  - Setup and usage
- [Creating Templates](#creating-templates)
  - Binding values to HTML
- [Handlebars Expressions](#handlebars-expressions)
  - Block and conditional
- [Helpers](#handlebarsjs-helpers)

<!-- HTML Templates Overview-->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-section", id:"html-templates-overview" } -->
# HTML Templates
## Overview

<!-- attr: { hasScriptWrapper:true } -->
# HTML Templates
- HTML templates or template engines:
  - Make the **HTML dynamic**
    - Allow programming logic inside the otherwise static HTML
  - Provide **cleaner and more sustainable** way to dynamically create DOM elements
- HTML templates are many:
  - Basic: Handlebars.js, mustache.js, underscore.js, jQuery templates
  - Advanced: KendoUI, AngularJS


<!-- Handlebars.js -->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-section", id:"handlebarsjs-overview" } -->
# Handlebars.js Overview
## Setup and basics

<!-- attr: { hasScriptWrapper:true } -->
# Handlebars.js Overview
- **Handlebars.js** is an open-source template engine
  - Provides both **run-time and compiled templates** for rendering HTML
  - Allows **one-way data-binding** of HTML elements to JavaScript objects
  - Produces HTML code based on **a template** and a given **JavaScript object**

<!-- attr: { hasScriptWrapper:true } -->
# Handlebars.js<br/>Setup and Usage
- Acquire handlerbars.js:
  - From the site at [handlebarsjs.com](http://handlebarsjs.com)
  - Using bower: 
```
bower install handlebars
```
  - Src the script in the HTML file

```
<script src="path/to/handlebars.js"></ script>
```

<!-- attr: { hasScriptWrapper:true, style:"font-size: 40px" } -->
# Handlebars.js<br/>Setup and Usage
- Create a template
- In a script tag with invalid type attribute

```
<div class='post'>
  <h1 class="post-title">{{title}}</h1>
  <p class="post-content">{{{content}}}</p>
</div>
```
- Render the template with JavaScript:

```
    var post = {title: '…', content: '…'},
        htmlTemplate = postTemplateNode.innerHTML,
        postTemplate = Handlebars.compile(htmlTemplate),
    postNode.innerHTML = postTemplate(post);
```

<!-- attr: { hasScriptWrapper:true, class:"slide-section"  } -->
# Setup and Usage
## [Demo]()


<!-- Templates with Handlebars.js -->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true,  class:"slide-section", id:"creating-templates" } -->
# Creating HTML Templates with Handlebars.js
## Start from the beginning

<!-- attr: { hasScriptWrapper:true, style:"font-size:0.9em" } -->
# Templates with<br/>Handlebars.js
- HTML templates act much like `string.Format()` in **C#** and **Java** and `stringWithFormat: @"…"` in **Objective-C**
  - Put placeholders within a template string, and replace these placeholders with values
- Handlebars.js marks placeholders with **double curly brackets** `{{value}}`
  - When rendered, **the placeholders** between the curly brackets are **replaced with the corresponding value**

<!-- attr: { hasScriptWrapper:true, style:"font-size:0.9em" } -->
# Handlebars.js<br/>Templates Example
- Creating the Template
```
  <div class="post">
    <h1 class="post-title">{{title}}</h1>
    <p class="post-content">{{content}}</p>
  </div>
```
- Create the **JavaScript object** and render the template to **produce pure HTML** code
```
  var post = { title: ' ... ', content: ' ... ' },
      tmplStr = document.getElementById('...').innerHTML
      template = Handlebars.compile(tmplStr);

  domNode.innerHTML = template(post);
```

<!-- attr: { hasScriptWrapper:true, class:"slide-section"  } -->
# Creating Handlebars Templates
## [Demo]()

<!-- attr: { hasScriptWrapper:true } -->
# HTML Escaping
- Handlebars.js escapes all values before rendering them
- If the value should not be escaped there are two possibilities:
    - Use **triple curly brackets** in the template string:
```
{{{value}}}
```
- Mark in the value **not to be escaped**
```
   var post = { title: '…',
       content: new Handlebars.SafeString('…')
   };
```

<span class="balloon fragment" style="top:75%; right:10%">Mostly used with helpers</span>

<!-- attr: { hasScriptWrapper:true, class:"slide-section"  } -->
# HTML Escaping
## [Demo]()

<!-- Handlebars Expressions-->

<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-section", id:"handlebars-expressions" } -->
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
  - Created using<br/>`{{#collection}}` and `{{/collection}}`
    - Everything between will be evaluated for each object in the collection

```
  <ul class="categories-list">
    {{#categories}}
      <li class="category-item">
        <a href="#/categories/{{id}}">{{name}}</a>
      </li>
    {{/categories}}
  </ul>
```

<span class="balloon fragment" style="top: 80%; right: 15%">The id and the name of every object</span>

<!-- attr: { hasScriptWrapper:true, class:"slide-section" } -->
# Block Expressions
## [Demo]()

<!-- attr: { hasScriptWrapper:true } -->
# Conditional Expressions
- Render code only if a condition is fulfilled
  - Using `{{#if condition}}` `{{/if}}` or `{{#unless condition}} {{/unless}}`

```
  <h1>Posts</h1>
  <ul class="posts">
    {{#posts}}
      <li>
        <strong>
          <a href="# /posts/{{id}}">{{title}}</a>
        </strong>
        {{#if author}}
          <span class="author">by {{author}}</span>
        {{/if}}
      </li>
   {{/posts}}
  </ul>
```

<span class="balloon fragment" style="width:330px; top:80%; left:38%">If author is false-like value,  this code will not be rendered</span>

<!-- attr: { hasScriptWrapper:true, class:"slide-section" } -->
# Conditional Expressions
## [Demo]()

<!-- Handlebars Helpers-->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-section", id:"handlebarsjs-helpers" } -->
# Handlebars.js Helpers
## Helping you even more!

<!-- attr: { hasScriptWrapper:true } -->
# Handlebars.js Helpers
- Handlebars.js helpers are like functions that do a predefined job
- Built-in helpers:
  - `{{#each collection}} {{/each}}`
    - Much like block expressions but with more control like `{{@index}}` and `{{this}}`
  - `{{#with obj}} {{/with}}`
    - Used to shorten the path of property names
    - Write `{{prop}}` instead of `{{obj.prop}}`

<!-- attr: { hasScriptWrapper:true, class:"slide-section" } -->
# Handlebars.js Helpers
## [Demo]()

<!-- attr: { hasScriptWrapper:true } -->
# Registering Custom Helpers
- Handlebars.js supports extension of the built-in helpers
  - Using `Handlebars.registerHelper(…)`;

```
  Handlebars.registerHelper ('tags', function(tags){
    var html = '<ul class="tags-list">',
        tag;
    for(tag in tags){
      html += '<li class="tag">' + tag + '</li>';
    }
    return new Handlebars.SafeString(html);
  });
```

<span class="balloon fragment" style="top:72%; right: 20%">SafeString is mandatory here</span>
<span class="balloon fragment" style="top:77%; right: 10%">Otherwise the result will be escaped</span>

<!-- attr: { hasScriptWrapper:true, class:"slide-section" } -->
# Registering Handlebars.js Helpers
## [Demo]()

<!-- Questions -->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-questions", id:"questions" } -->
# HTML Templates
## Questions
