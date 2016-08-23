function solve() {
	return function() {
		var template = [
			'<h1>{{title}}</h1>',
			'<ul>',
			'	{{#each posts}}',
			'		<li>',
			'			<div class="post">',
			'				<p class="author">',
			'					{{#if author}}',
			'						<a class="user" href="/user/{{author}}">{{author}}</a>',
			'					{{else}}',
			'						<a class="anonymous">Anonymous</a>',
			'					{{/if}}',
			'				</p>',
			'				<pre class="content">{{{text}}}</pre>',
			'			</div>',
			'			<ul>',
			'				{{#each comments}}',
			'					{{#if deleted}}',
			'					{{else}}',
			'						<li>',
			'							<div class="comment">',
			'								<p class="author">',
			'									{{#if author}}',
			'										<a class="user" href="/user/{{author}}">{{author}}</a>',
			'									{{else}}',
			'										<a class="anonymous">Anonymous</a>',
			'									{{/if}}',
			'								</p>',
			'								<pre class="content">{{{text}}}</pre>',
			'							</div>',
			'						</li>',
			'					{{/if}}',
			'				{{/each}}',
			'			</ul>',
			'		</li>',
			'	{{/each}}',
			'</ul>'
		].join('\n');

		return template;
	}
}

// submit the above

if(typeof module !== 'undefined') {
	module.exports = solve;
}
