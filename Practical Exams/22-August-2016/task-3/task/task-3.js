function solve() {
    return function() {
        var template = `
<ul class="nav">
	{{#if logo}}
		<li class="nav-item logo">
			<a href="{{logo.url}}">
				<img src="{{logo.image}}" />
			</a>
		</li>
	{{/if}}	
	{{#each items}}
		<li class="nav-item">
			<a href="{{url}}">{{title}}</a>
			
			{{#if items}}
				<ul class="subnav">
					{{#each items}}
						<li class="nav-item">
							<a href="{{url}}">{{title}}</a>
						</li>
					{{/each}}
				</ul>
			{{/if}}
		</li>
	{{/each}}
</ul>`;
        return template;
    };
}

module.exports = solve;