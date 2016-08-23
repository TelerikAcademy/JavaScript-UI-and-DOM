var expect = require('chai').expect;
var jsdom = require('jsdom');
var jq = require('jquery');
var result = require('../task/solution.js')();
var hb = require('handlebars');

describe('Forum task', function() {
	before(function(done) {
		jsdom.env({
			html: '',
			done: function(errors, window) {
				global.window = window;
				global.document = window.document;
				global.$ = jq(window);
				Object.keys(window)
					.filter(function(prop) {
						return prop.toLowerCase()
							.indexOf('html') >= 0;
					}).forEach(function(prop) {
						global[prop] = window[prop];
					});
				done();
			}
		});
	});

	function structureTestLevel0($root, data) {
		expect($root.children().length).to.equal(2);
		expect($root.children()[0].tagName).to.equal('H1');
		expect($root.children()[1].tagName).to.equal('UL');
		var $posts = $root.children('ul').children();
		expect($posts.length).to.equal(data.posts.length);
	}
	function structureTestLevel1($root, data) {
		var $posts = $root.children('ul').children();
		$posts.each(function(i, x) {
			x = $(x);
			var $post = x.children('div');
			expect($post.length).to.equal(1);
			expect($post.children().length).to.equal(2);
			expect($post.children()[0].tagName).to.equal('P');
			expect($post.children()[1].tagName).to.equal('PRE');
			if(data.posts[i].comments.length > 0) {
				var $comments = x.children('ul').children('li');
				var commentCount = data.posts[i].comments.length;
				data.posts[i].comments.forEach(function(z) {
					if(z.deleted) {
						--commentCount;
					}
				});
				expect($comments.length).to.equal(commentCount);
			}
		});
	}
	function structureTestLevel2($root, data) {
		var $posts = $root.children('ul').children();
		$posts.each(function(i, x) {
			x = $(x);
			var $post = x.children('div');
			if(data.posts[i].comments.length > 0) {
				var $comments = x.children('ul').children('li');
				$comments.each(function(j, y) {
					y = $(y);
					var $comment = y.children('div');
					expect($comment.length).to.equal(1);
					expect($comment.children().length).to.equal(2);
					expect($comment.children()[0].tagName).to.equal('P');
					expect($comment.children()[1].tagName).to.equal('PRE');
				});
			}
		});
	}

	function attributeTestLevel1($root, data) {
		var $posts = $root.children('ul').children();
		$posts.each(function(i, x) {
			x = $(x);
			var $post = x.children('div');
			expect($post.hasClass('post')).to.be.true;
			expect($post.children('p').hasClass('author')).to.be.true;
			if(data.posts[i].author) {
				expect($post.children('p').children('a').hasClass('user')).to.be.true;
				expect($post.children('p').children('a').hasClass('anonymous')).to.be.false;
				expect($post.children('p').children('a').attr('href')).to.equal('/user/' + data.posts[i].author);
			}
			else {
				expect($post.children('p').children('a').hasClass('user')).to.be.false;
				expect($post.children('p').children('a').hasClass('anonymous')).to.be.true;
				expect($post.children('p').children('a').attr('href')).to.be.undefined;
			}
			expect($post.children('pre').hasClass('content')).to.be.true;
		});
	}

	function attributeTestLevel2($root, data) {
		var $posts = $root.children('ul').children();
		$posts.each(function(i, x) {
			x = $(x);
			var $post = x.children('div');
			if(data.posts[i].comments.length > 0) {
				var $comments = x.children('ul').children('li');
				var comments = data.posts[i].comments.filter(function(z) {
					return !z.deleted;
				});
				$comments.each(function(j, y) {
					y = $(y);
					var $comment = y.children('div');
					expect($comment.hasClass('comment')).to.be.true;
					expect($comment.children('p').hasClass('author')).to.be.true;
					if(comments[j].author) {
						expect($comment.children('p').children('a').hasClass('user')).to.be.true;
						expect($comment.children('p').children('a').hasClass('anonymous')).to.be.false;
						expect($comment.children('p').children('a').attr('href')).to.equal('/user/' + comments[j].author);
					}
					else {
						expect($comment.children('p').children('a').hasClass('user')).to.be.false;
						expect($comment.children('p').children('a').hasClass('anonymous')).to.be.true;
						expect($comment.children('p').children('a').attr('href')).to.be.undefined;
					}
					expect($comment.children('pre').hasClass('content')).to.be.true;
				});
			}
		});
	}

	function contentTestLevel0($root, data) {
		var title = data.title
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
		expect($root.children('h1').html()).to.equal(title);
	}

	function contentTestLevel1($root, data) {
		var $posts = $root.children('ul').children();
		$posts.each(function(i, x) {
			x = $(x);
			var $post = x.children('div');
			var $p = $post.children('p');
			var author = (data.posts[i].author || 'Anonymous')
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;');
			expect($p.children('a').html()).to.equal(author);
			expect($post.children('pre').html()).to.equal(data.posts[i].text);
		});
	}

	function contentTestLevel2($root, data) {
		var $posts = $root.children('ul').children();
		$posts.each(function(i, x) {
			x = $(x);
			var $post = x.children('div');
			var $p = $post.children('p');
			if(data.posts[i].comments.length > 0) {
				var $comments = x.children('ul').children('li');
				var comments = data.posts[i].comments.filter(function(z) {
					return !z.deleted;
				});
				$comments.each(function(j, y) {
					y = $(y);
					var $comment = y.children('div');
					var $p = $comment.children('p');
					var author = (comments[j].author || 'Anonymous')
						.replace(/&/g, '&amp;')
						.replace(/</g, '&lt;')
						.replace(/>/g, '&gt;');
					expect($p.children('a').html()).to.equal(author);
					expect($comment.children('pre').html()).to.equal(comments[j].text);
				});
			}
		});
	}

	function runTests($root, data) {
		structureTestLevel0($root, data);
		structureTestLevel1($root, data);
		structureTestLevel2($root, data);

		attributeTestLevel1($root, data);
		attributeTestLevel2($root, data);

		contentTestLevel0($root, data);
		contentTestLevel1($root, data);
		contentTestLevel2($root, data);
	}

	describe('Sample tests', function() {
		it('Sample test 1', function() {
			document.body.innerHTML = '<div id="root"></div>';
			var jQueryDummy = $;
			$ = jQuery = undefined;
			var template = hb.compile(result());
			$ = jQuery = jQueryDummy;

			var data = {
				title: 'Conspiracy Theories',
				posts: [{
					author: '',
					text: 'Dear God,',
					comments: [{
						author: 'G',
						text: 'Yes, my child?'
					}, {
						author: '',
						text: 'I would like to file a bug report.'
					}]
				}, {
					author: 'Cuki',
					text: '<a href="https://xkcd.com/258/">link</a>',
					comments: []
				}]
			};

			var $root = $('#root');
			$root.html(template(data));

			runTests($root, data);
		});

		it('Sample test 2', function() {
			document.body.innerHTML = '<div id="root"></div>';
			var jQueryDummy = $;
			$ = jQuery = undefined;
			var template = hb.compile(result());
			$ = jQuery = jQueryDummy;

			var data = {
				title: 'JS UI & DOM 2016',
				posts: [{
					author: 'Cuki',
					text: 'Hello guys',
					comments: [{
						author: 'Kon',
						text: 'Hello'
					}, {
						text: 'Hello'
					}]
				}, {
					author: 'Cuki',
					text: 'This works',
					comments: [{
						author: 'Cuki',
						text: 'Well, ofcourse!\nRegards'
					}, {
						text: 'You are fat',
						deleted: true
					}]
				}, {
					author: 'Pesho',
					text: 'Is anybody out <a href="https://facebook.com/">there</a>?',
					comments: []
				}]
			};

			var $root = $('#root');
			$root.html(template(data));

			runTests($root, data);
		});
	});

	describe('Tests', function() {
		describe('One post, no comments', function() {
			it('one post from anonymous', function() {
				document.body.innerHTML = '<div id="root"></div>';
				var jQueryDummy = $;
				$ = jQuery = undefined;
				var template = hb.compile(result());
				$ = jQuery = jQueryDummy;

				var data = {
					title: 'Amazing',
					posts: [{
						author: '',
						text: 'Shpluamumuretoninocikiibacki',
						comments: []
					}]
				};

				var $root = $('#root');
				$root.html(template(data));

				runTests($root, data);
			});

			it('one post from John Doe', function() {
				document.body.innerHTML = '<div id="root"></div>';
				var jQueryDummy = $;
				$ = jQuery = undefined;
				var template = hb.compile(result());
				$ = jQuery = jQueryDummy;

				var data = {
					title: 'Amazing',
					posts: [{
						author: 'John Doe',
						text: 'Shpluamumuretoninocikiibacki',
						comments: []
					}]
				};

				var $root = $('#root');
				$root.html(template(data));

				runTests($root, data);
			});

			it('special symbols in title', function() {
				document.body.innerHTML = '<div id="root"></div>';
				var jQueryDummy = $;
				$ = jQuery = undefined;
				var template = hb.compile(result());
				$ = jQuery = jQueryDummy;

				var data = {
					title: '2 < 3',
					posts: [{
						author: 'John Doe',
						text: 'Mom said that 2 is less than 3',
						comments: []
					}]
				};

				var $root = $('#root');
				$root.html(template(data));

				runTests($root, data);
			});

			it('special symbols in author name', function() {
				document.body.innerHTML = '<div id="root"></div>';
				var jQueryDummy = $;
				$ = jQuery = undefined;
				var template = hb.compile(result());
				$ = jQuery = jQueryDummy;

				var data = {
					title: 'Mom said',
					posts: [{
						author: 'John<Doe',
						text: 'Mom said that 2 is less than 3',
						comments: []
					}]
				};

				var $root = $('#root');
				$root.html(template(data));

				runTests($root, data);
			});

			it('special symbols in content', function() {
				document.body.innerHTML = '<div id="root"></div>';
				var jQueryDummy = $;
				$ = jQuery = undefined;
				var template = hb.compile(result());
				$ = jQuery = jQueryDummy;

				var data = {
					title: 'Mom said',
					posts: [{
						author: 'John Doe',
						text: 'Mom said that 2 &lt; 3',
						comments: []
					}]
				};

				var $root = $('#root');
				$root.html(template(data));

				runTests($root, data);
			});

			it('html tags in content', function() {
				document.body.innerHTML = '<div id="root"></div>';
				var jQueryDummy = $;
				$ = jQuery = undefined;
				var template = hb.compile(result());
				$ = jQuery = jQueryDummy;

				var data = {
					title: 'Mom said',
					posts: [{
						author: 'John Doe',
						text: '<a href="https://www.google.bg/"><img src="mom.jpg"></a>',
						comments: []
					}]
				};

				var $root = $('#root');
				$root.html(template(data));

				runTests($root, data);
			});

			it('multiline content', function() {
				document.body.innerHTML = '<div id="root"></div>';
				var jQueryDummy = $;
				$ = jQuery = undefined;
				var template = hb.compile(result());
				$ = jQuery = jQueryDummy;

				var data = {
					title: 'Mom said',
					posts: [{
						author: 'John Doe',
						text: 'Mom said\nsomething important\nyesterday.',
						comments: []
					}]
				};

				var $root = $('#root');
				$root.html(template(data));

				runTests($root, data);
			});
		});

		describe('Several posts, no comments', function() {
			it('2 anonymous posts', function() {
				document.body.innerHTML = '<div id="root"></div>';
				var jQueryDummy = $;
				$ = jQuery = undefined;
				var template = hb.compile(result());
				$ = jQuery = jQueryDummy;

				var data = {
					title: 'o52n38y9 4923 y89 H0 9 t39823t o 34 0t49',
					posts: [{
						author: '',
						text: 'g4wjpiiihijgokm8vruv95itv93,utc945ug8953h34igj3i4gjp3',
						comments: []
					}, {
						author: '',
						text: 'fjewijt4ut98m3gt8c3irl3ur83kt85u4t843jg2jutg4p29jgtjpoj2ge',
						comments: []
					}]
				};

				var $root = $('#root');
				$root.html(template(data));

				runTests($root, data);
			});

			it('many anonymous posts', function() {
				document.body.innerHTML = '<div id="root"></div>';
				var jQueryDummy = $;
				$ = jQuery = undefined;
				var template = hb.compile(result());
				$ = jQuery = jQueryDummy;

				var data = {
					title: 'o52n38y9 4923 y89 H0 9 t39823t o 34 0t49',
					posts: [{
						author: '',
						text: 'g4wjpiiihijgokm8vruv95itv93,utc945ug8953h34igj3i4gjp3',
						comments: []
					}, {
						author: '',
						text: 'fjewijt4ut98m3gt8c3irl3ur83kt85u4t843jg2jutg4p29jgtjpoj2ge',
						comments: []
					}, {
						author: '',
						text: '34932id-f3iqpofuiqoygfh y823h r3jidqjif3jfmcfjqi uij3wmkdjoi3r',
						comments: []
					}, {
						author: '',
						text: '19u221fu3rr u8u1231u3123u12378127309123012390',
						comments: []
					}, {
						author: '',
						text: 'oeu194781248127389123u8129378912379812378123',
						comments: []
					}, {
						author: '',
						text: '2391923781237918273127878787381273891371232',
						comments: []
					}, {
						author: '',
						text: '42',
						comments: []
					}]
				};

				var $root = $('#root');
				$root.html(template(data));

				runTests($root, data);
			});

			it('2 posts from users', function() {
				document.body.innerHTML = '<div id="root"></div>';
				var jQueryDummy = $;
				$ = jQuery = undefined;
				var template = hb.compile(result());
				$ = jQuery = jQueryDummy;

				var data = {
					title: 'Mom said',
					posts: [{
						author: 'John Doe',
						text: 'Mom said\nsomething important\nyesterday.',
						comments: []
					}, {
						author: 'Mom',
						text: 'I said that you have to brush your teeth',
						comments: []
					}]
				};

				var $root = $('#root');
				$root.html(template(data));

				runTests($root, data);
			});

			it('many posts from users', function() {
				document.body.innerHTML = '<div id="root"></div>';
				var jQueryDummy = $;
				$ = jQuery = undefined;
				var template = hb.compile(result());
				$ = jQuery = jQueryDummy;

				var data = {
					title: 'o52n38y9 4923 y89 H0 9 t39823t o 34 0t49',
					posts: [{
						author: 'pesho',
						text: 'g4wjpiiihijgokm8vruv95itv93,utc945ug8953h34igj3i4gjp3',
						comments: []
					}, {
						author: 'gosho',
						text: 'fjewijt4ut98m3gt8c3irl3ur83kt85u4t843jg2jutg4p29jgtjpoj2ge',
						comments: []
					}, {
						author: 'johny',
						text: '34932id-f3iqpofuiqoygfh y823h r3jidqjif3jfmcfjqi uij3wmkdjoi3r',
						comments: []
					}, {
						author: 'boris',
						text: '19u221fu3rr u8u1231u3123u12378127309123012390',
						comments: []
					}, {
						author: 'me',
						text: 'oeu194781248127389123u8129378912379812378123',
						comments: []
					}, {
						author: 'someone',
						text: '2391923781237918273127878787381273891371232',
						comments: []
					}, {
						author: '42',
						text: '42',
						comments: []
					}, {
						author: 'notanonymous',
						text: 'spam',
						comments: []
					}]
				};

				var $root = $('#root');
				$root.html(template(data));

				runTests($root, data);
			});

			it('mixed', function() {
					document.body.innerHTML = '<div id="root"></div>';
				var jQueryDummy = $;
				$ = jQuery = undefined;
				var template = hb.compile(result());
				$ = jQuery = jQueryDummy;

				var data = {
					title: 'o52n38y9 4923 y89 H0 9 t39823t o 34 0t49',
					posts: [{
						author: 'pesho',
						text: 'g4wjpiiihijgokm8vruv95itv93,utc945ug8953h34igj3i4gjp3',
						comments: []
					}, {
						author: 'gosho',
						text: 'fjewijt4ut98m3gt8c3irl3ur83kt85u4t843jg2jutg4p29jgtjpoj2ge',
						comments: []
					}, {
						author: '',
						text: '34932id-f3iqpofuiqoygfh y823h r3jidqjif3jfmcfjqi uij3wmkdjoi3r',
						comments: []
					}, {
						author: 'boris',
						text: '19u221fu3rr u8u1231u3123u12378127309123012390',
						comments: []
					}, {
						author: '',
						text: 'oeu194781248127389123u8129378912379812378123',
						comments: []
					}, {
						author: 'someone',
						text: '2391923781237918273127878787381273891371232',
						comments: []
					}, {
						author: '42',
						text: '42',
						comments: []
					}, {
						author: '',
						text: 'spam',
						comments: []
					}]
				};

				var $root = $('#root');
				$root.html(template(data));

				runTests($root, data);
			});
		});

		describe('Posts with comments', function() {
			it('one post, one comment', function() {
				document.body.innerHTML = '<div id="root"></div>';
				var jQueryDummy = $;
				$ = jQuery = undefined;
				var template = hb.compile(result());
				$ = jQuery = jQueryDummy;

				var data = {
					title: 'o52n38y9 4923 y89 H0 9 t39823t o 34 0t49',
					posts: [{
						author: 't3ifeijfwe',
						text: 'g4wjpiiihijgokm8vruv95itv93,utc945ug8953h34igj3i4gjp3',
						comments: [{
							author: 'rijgrr',
							text: 'ru93ifqkml;weg4 3y3 oigi'
						}]
					}]
				};

				var $root = $('#root');
				$root.html(template(data));

				runTests($root, data);
			});

			it('one post, several comments', function() {
				document.body.innerHTML = '<div id="root"></div>';
				var jQueryDummy = $;
				$ = jQuery = undefined;
				var template = hb.compile(result());
				$ = jQuery = jQueryDummy;

				var data = {
					title: 'o52n38y9 4923 y89 H0 9 t39823t o 34 0t49',
					posts: [{
						author: 't3ifeijfwe',
						text: 'g4wjpiiihijgokm8vruv95itv93,utc945ug8953h34igj3i4gjp3',
						comments: [{
							author: 'rijgrr',
							text: 'ru93ifqkml;weg4 3y3 oigi'
						}, {
							author: 'hello',
							text: 'hello'
						}, {
							author: 'rijgrr',
							text: 'koqfoqekf\neofjewpjfk'
						}]
					}]
				};

				var $root = $('#root');
				$root.html(template(data));

				runTests($root, data);
			});

			it('several posts, one comment', function() {
				document.body.innerHTML = '<div id="root"></div>';
				var jQueryDummy = $;
				$ = jQuery = undefined;
				var template = hb.compile(result());
				$ = jQuery = jQueryDummy;

				var data = {
					title: 'o52n38y9 4923 y89 H0 9 t39823t o 34 0t49',
					posts: [{
						author: 't3ifeijfwe',
						text: 'g4wjpiiihijgokm8vruv95itv93,utc945ug8953h34igj3i4gjp3',
						comments: []
					}, {
						author: 'rijgrr',
						text: 'ru93ifqkml;weg4 3y3 oigi',
						comments: []
					}, {
						author: 'hello',
						text: 'hello',
						comments: [{
							author: 'hello',
							text: 'hello to you, too'
						}]
					}, {
						author: 'rijgrr',
						text: 'koqfoqekf\neofjewpjfk',
						comments: []
					}]
				};

				var $root = $('#root');
				$root.html(template(data));

				runTests($root, data);
			});

			it('several posts, one comment each', function() {
				document.body.innerHTML = '<div id="root"></div>';
				var jQueryDummy = $;
				$ = jQuery = undefined;
				var template = hb.compile(result());
				$ = jQuery = jQueryDummy;

				var data = {
					title: 'o52n38y9 4923 y89 H0 9 t39823t o 34 0t49',
					posts: [{
						author: 't3ifeijfwe',
						text: 'g4wjpiiihijgokm8vruv95itv93,utc945ug8953h34igj3i4gjp3',
						comments: [{
							author: 'hello',
							text: 'hello to you, too'
						}]
					}, {
						author: 'rijgrr',
						text: 'ru93ifqkml;weg4 3y3 oigi',
						comments: [{
							author: 'hello',
							text: 'hello to you, too'
						}]
					}, {
						author: 'hello',
						text: 'hello',
						comments: [{
							author: 'hello',
							text: 'hello to you, too'
						}]
					}, {
						author: 'rijgrr',
						text: 'koqfoqekf\neofjewpjfk',
						comments: [{
							author: 'hello',
							text: 'hello to you, too'
						}]
					}]
				};

				var $root = $('#root');
				$root.html(template(data));

				runTests($root, data);
			});

			it('several posts, several comments', function() {
				document.body.innerHTML = '<div id="root"></div>';
				var jQueryDummy = $;
				$ = jQuery = undefined;
				var template = hb.compile(result());
				$ = jQuery = jQueryDummy;

				var data = {
					title: 'o52n38y9 4923 y89 H0 9 t39823t o 34 0t49',
					posts: [{
						author: 't3ifeijfwe',
						text: 'g4wjpiiihijgokm8vruv95itv93,utc945ug8953h34igj3i4gjp3',
						comments: [{
							author: 'hello',
							text: 'hello to you, too'
						}, {
							author: 'ewokwekowe',
							text: 'eko4g4gjp23t42n24 4nj4'
						}]
					}, {
						author: 'rijgrr',
						text: 'ru93ifqkml;weg4 3y3 oigi',
						comments: [{
							author: 'hello',
							text: 'hello to you, too'
						}, {
							author: 'hello',
							text: 'hello to you, too'
						}, {
							author: 'hello',
							text: 'hello to you, too'
						}]
					}, {
						author: 'hello',
						text: 'hello',
						comments: [{
							author: 'hello',
							text: 'hello to you, too'
						}]
					}, {
						author: 'rijgrr',
						text: 'koqfoqekf\neofjewpjfk',
						comments: [{
							author: 'f92fjiefq',
							text: 'po23t09ifvoqeijvqg4vqjgo4jeqgujiqekeljqighkneqihknleqihgkniheqknlvqeihknvlevknleqsknv\nfqwiuf8q3uwgcft3ws'
						}, {
							author: 'hello',
							text: 'hello to you, too'
						}]
					}]
				};

				var $root = $('#root');
				$root.html(template(data));

				runTests($root, data);
			});
		});

		describe('Posts with deleted comments', function() {
			it('one post, one comment', function() {
				document.body.innerHTML = '<div id="root"></div>';
				var jQueryDummy = $;
				$ = jQuery = undefined;
				var template = hb.compile(result());
				$ = jQuery = jQueryDummy;

				var data = {
					title: 'o52n38y9 4923 y89 H0 9 t39823t o 34 0t49',
					posts: [{
						author: 't3ifeijfwe',
						text: 'g4wjpiiihijgokm8vruv95itv93,utc945ug8953h34igj3i4gjp3',
						comments: [{
							author: 'rijgrr',
							text: 'ru93ifqkml;weg4 3y3 oigi',
							deleted: true
						}]
					}]
				};

				var $root = $('#root');
				$root.html(template(data));

				runTests($root, data);
			});

			it('one post, several comments', function() {
				document.body.innerHTML = '<div id="root"></div>';
				var jQueryDummy = $;
				$ = jQuery = undefined;
				var template = hb.compile(result());
				$ = jQuery = jQueryDummy;

				var data = {
					title: 'o52n38y9 4923 y89 H0 9 t39823t o 34 0t49',
					posts: [{
						author: 't3ifeijfwe',
						text: 'g4wjpiiihijgokm8vruv95itv93,utc945ug8953h34igj3i4gjp3',
						comments: [{
							author: 'rijgrr',
							text: 'ru93ifqkml;weg4 3y3 oigi',
							deleted: true
						}, {
							author: 'hello',
							text: 'hello',
							deleted: true
						}, {
							author: 'rijgrr',
							text: 'koqfoqekf\neofjewpjfk',
							deleted: true
						}]
					}]
				};

				var $root = $('#root');
				$root.html(template(data));

				runTests($root, data);
			});

			it('several posts, one comment', function() {
				document.body.innerHTML = '<div id="root"></div>';
				var jQueryDummy = $;
				$ = jQuery = undefined;
				var template = hb.compile(result());
				$ = jQuery = jQueryDummy;

				var data = {
					title: 'o52n38y9 4923 y89 H0 9 t39823t o 34 0t49',
					posts: [{
						author: 't3ifeijfwe',
						text: 'g4wjpiiihijgokm8vruv95itv93,utc945ug8953h34igj3i4gjp3',
						comments: []
					}, {
						author: 'rijgrr',
						text: 'ru93ifqkml;weg4 3y3 oigi',
						comments: []
					}, {
						author: 'hello',
						text: 'hello',
						comments: [{
							author: 'hello',
							text: 'hello to you, too',
							deleted: true
						}]
					}, {
						author: 'rijgrr',
						text: 'koqfoqekf\neofjewpjfk',
						comments: []
					}]
				};

				var $root = $('#root');
				$root.html(template(data));

				runTests($root, data);
			});

			it('several posts, one comment each', function() {
				document.body.innerHTML = '<div id="root"></div>';
				var jQueryDummy = $;
				$ = jQuery = undefined;
				var template = hb.compile(result());
				$ = jQuery = jQueryDummy;

				var data = {
					title: 'o52n38y9 4923 y89 H0 9 t39823t o 34 0t49',
					posts: [{
						author: 't3ifeijfwe',
						text: 'g4wjpiiihijgokm8vruv95itv93,utc945ug8953h34igj3i4gjp3',
						comments: [{
							author: 'hello',
							text: 'hello to you, too',
							deleted: true
						}]
					}, {
						author: 'rijgrr',
						text: 'ru93ifqkml;weg4 3y3 oigi',
						comments: [{
							author: 'hello',
							text: 'hello to you, too',
							deleted: true
						}]
					}, {
						author: 'hello',
						text: 'hello',
						comments: [{
							author: 'hello',
							text: 'hello to you, too',
							deleted: true
						}]
					}, {
						author: 'rijgrr',
						text: 'koqfoqekf\neofjewpjfk',
						comments: [{
							author: 'hello',
							text: 'hello to you, too',
							deleted: true
						}]
					}]
				};

				var $root = $('#root');
				$root.html(template(data));

				runTests($root, data);
			});

			it('several posts, several comments', function() {
				document.body.innerHTML = '<div id="root"></div>';
				var jQueryDummy = $;
				$ = jQuery = undefined;
				var template = hb.compile(result());
				$ = jQuery = jQueryDummy;

				var data = {
					title: 'o52n38y9 4923 y89 H0 9 t39823t o 34 0t49',
					posts: [{
						author: 't3ifeijfwe',
						text: 'g4wjpiiihijgokm8vruv95itv93,utc945ug8953h34igj3i4gjp3',
						comments: [{
							author: 'hello',
							text: 'hello to you, too',
							deleted: true
						}, {
							author: 'ewokwekowe',
							text: 'eko4g4gjp23t42n24 4nj4',
							deleted: true
						}]
					}, {
						author: 'rijgrr',
						text: 'ru93ifqkml;weg4 3y3 oigi',
						comments: [{
							author: 'hello',
							text: 'hello to you, too',
							deleted: true
						}, {
							author: 'hello',
							text: 'hello to you, too',
							deleted: true
						}, {
							author: 'hello',
							text: 'hello to you, too',
							deleted: true
						}]
					}, {
						author: 'hello',
						text: 'hello',
						comments: [{
							author: 'hello',
							text: 'hello to you, too',
							deleted: true
						}]
					}, {
						author: 'rijgrr',
						text: 'koqfoqekf\neofjewpjfk',
						comments: [{
							author: 'f92fjiefq',
							text: 'po23t09ifvoqeijvqg4vqjgo4jeqgujiqekeljqighkneqihknleqihgkniheqknlvqeihknvlevknleqsknv\nfqwiuf8q3uwgcft3ws',
							deleted: true
						}, {
							author: 'hello',
							text: 'hello to you, too',
							deleted: true
						}]
					}]
				};

				var $root = $('#root');
				$root.html(template(data));

				runTests($root, data);
			});
		});

		describe('Posts with some comments deleted', function() {
			it('one post, one comment', function() {
				document.body.innerHTML = '<div id="root"></div>';
				var jQueryDummy = $;
				$ = jQuery = undefined;
				var template = hb.compile(result());
				$ = jQuery = jQueryDummy;

				var data = {
					title: 'o52n38y9 4923 y89 H0 9 t39823t o 34 0t49',
					posts: [{
						author: 't3ifeijfwe',
						text: 'g4wjpiiihijgokm8vruv95itv93,utc945ug8953h34igj3i4gjp3',
						comments: [{
							author: 'rijgrr',
							text: 'ru93ifqkml;weg4 3y3 oigi',
							deleted: true
						}]
					}]
				};

				var $root = $('#root');
				$root.html(template(data));

				runTests($root, data);
			});

			it('one post, several comments', function() {
				document.body.innerHTML = '<div id="root"></div>';
				var jQueryDummy = $;
				$ = jQuery = undefined;
				var template = hb.compile(result());
				$ = jQuery = jQueryDummy;

				var data = {
					title: 'o52n38y9 4923 y89 H0 9 t39823t o 34 0t49',
					posts: [{
						author: 't3ifeijfwe',
						text: 'g4wjpiiihijgokm8vruv95itv93,utc945ug8953h34igj3i4gjp3',
						comments: [{
							author: 'rijgrr',
							text: 'ru93ifqkml;weg4 3y3 oigi'
						}, {
							author: 'hello',
							text: 'hello',
							deleted: true
						}, {
							author: 'rijgrr',
							text: 'koqfoqekf\neofjewpjfk'
						}]
					}]
				};

				var $root = $('#root');
				$root.html(template(data));

				runTests($root, data);
			});

			it('several posts, one comment each', function() {
				document.body.innerHTML = '<div id="root"></div>';
				var jQueryDummy = $;
				$ = jQuery = undefined;
				var template = hb.compile(result());
				$ = jQuery = jQueryDummy;

				var data = {
					title: 'o52n38y9 4923 y89 H0 9 t39823t o 34 0t49',
					posts: [{
						author: 't3ifeijfwe',
						text: 'g4wjpiiihijgokm8vruv95itv93,utc945ug8953h34igj3i4gjp3',
						comments: [{
							author: 'hello',
							text: 'hello to you, too'
						}]
					}, {
						author: 'rijgrr',
						text: 'ru93ifqkml;weg4 3y3 oigi',
						comments: [{
							author: 'hello',
							text: 'hello to you, too',
							deleted: true
						}]
					}, {
						author: 'hello',
						text: 'hello',
						comments: [{
							author: 'hello',
							text: 'hello to you, too',
							deleted: true
						}]
					}, {
						author: 'rijgrr',
						text: 'koqfoqekf\neofjewpjfk',
						comments: [{
							author: 'hello',
							text: 'hello to you, too'
						}]
					}]
				};

				var $root = $('#root');
				$root.html(template(data));

				runTests($root, data);
			});

			it('several posts, several comments', function() {
				document.body.innerHTML = '<div id="root"></div>';
				var jQueryDummy = $;
				$ = jQuery = undefined;
				var template = hb.compile(result());
				$ = jQuery = jQueryDummy;

				var data = {
					title: 'o52n38y9 4923 y89 H0 9 t39823t o 34 0t49',
					posts: [{
						author: 't3ifeijfwe',
						text: 'g4wjpiiihijgokm8vruv95itv93,utc945ug8953h34igj3i4gjp3',
						comments: [{
							author: 'hello',
							text: 'hello to you, too',
							deleted: true
						}, {
							author: 'ewokwekowe',
							text: 'eko4g4gjp23t42n24 4nj4'
						}]
					}, {
						author: 'rijgrr',
						text: 'ru93ifqkml;weg4 3y3 oigi',
						comments: [{
							author: 'hello',
							text: 'hello to you, too'
						}, {
							author: 'hello',
							text: 'hello to you, too'
						}, {
							author: 'hello',
							text: 'hello to you, too',
							deleted: true
						}]
					}, {
						author: 'hello',
						text: 'hello',
						comments: [{
							author: 'hello',
							text: 'hello to you, too',
							deleted: true
						}]
					}, {
						author: 'rijgrr',
						text: 'koqfoqekf\neofjewpjfk',
						comments: [{
							author: 'f92fjiefq',
							text: 'po23t09ifvoqeijvqg4vqjgo4jeqgujiqekeljqighkneqihknleqihgkniheqknlvqeihknvlevknleqsknv\nfqwiuf8q3uwgcft3ws'
						}, {
							author: 'hello',
							text: 'hello to you, too'
						}]
					}]
				};

				var $root = $('#root');
				$root.html(template(data));

				runTests($root, data);
			});
		});

		describe('Posts, comments, deleted comments, anonymous authors, special symbols', function() {
			it('test 1', function() {
				document.body.innerHTML = '<div id="root"></div>';
				var jQueryDummy = $;
				$ = jQuery = undefined;
				var template = hb.compile(result());
				$ = jQuery = jQueryDummy;

				var data = {
					title: 'o52n38y9 4923 y89 H0 9 t39823t o 34 0t49',
					posts: [{
						author: '',
						text: 'g4wjpiiihijgokm8vruv95itv93,utc945ug8953h34igj3i4gjp3',
						comments: [{
							author: 'hello',
							text: 'hello to you, too',
							deleted: true
						}, {
							author: 'ewokwekowe',
							text: 'eko4g4gjp23t42n24 4nj4'
						}]
					}, {
						author: 'rijgrr',
						text: 'ru93ifqkml;weg4 3y3 oigi',
						comments: [{
							author: '',
							text: 'hello to you, too'
						}, {
							author: 'hello',
							text: 'hello to you, too'
						}, {
							author: '',
							text: 'hello to you, too',
							deleted: true
						}]
					}, {
						author: 'hello',
						text: 'hello',
						comments: [{
							author: 'hello',
							text: 'hello to you, too',
							deleted: true
						}]
					}, {
						author: 'rijgrr',
						text: 'koqfoqekf\neofjewpjfk',
						comments: [{
							author: 'f92fjiefq',
							text: 'po23t09ifvoqeijvqg4vqjgo4jeqgujiqekeljqighkneqihknleqihgkniheqknlvqeihknvlevknleqsknv\nfqwiuf8q3uwgcft3ws'
						}, {
							author: '',
							text: 'hello to you, too'
						}]
					}]
				};

				var $root = $('#root');
				$root.html(template(data));

				runTests($root, data);
			});

			it('test 2', function() {
				document.body.innerHTML = '<div id="root"></div>';
				var jQueryDummy = $;
				$ = jQuery = undefined;
				var template = hb.compile(result());
				$ = jQuery = jQueryDummy;

				var data = {
					title: 'o52n38y9 4923 y89 H0 9 t39823t o 34 0t49',
					posts: [{
						author: '',
						text: 'g4wjpiiihij<span>gokm8vruv95itv93</span>,utc945ug8953h34igj3i4gjp3',
						comments: [{
							author: 'hello',
							text: 'hello to you, too',
							deleted: true
						}, {
							author: 'ewokwekowe',
							text: 'eko4g4gjp23t4<span>2n24 4</span>nj4'
						}]
					}, {
						author: 'rijgrr',
						text: 'ru93ifqkml;weg4 3y3 oigi',
						comments: [{
							author: '',
							text: 'hello to you, too'
						}, {
							author: 'hello',
							text: 'hell<h2>o to y</h2>ou, too'
						}, {
							author: '',
							text: 'hello to you, too',
							deleted: true
						}]
					}, {
						author: 'hello',
						text: 'hello',
						comments: [{
							author: 'hello',
							text: 'hello to you, too',
							deleted: true
						}]
					}, {
						author: 'rijgrr',
						text: 'koqfoqekf\neofjewpjfk',
						comments: [{
							author: 'f92fjiefq',
							text: 'po23<span>t09ifvoqei<div>jvqg4vqjgo4jeqguj</div>iqekeljqighkneqihknle</span>qihgkniheqknlvqeihknvlevknleqsknv\nfqwiuf8q3uwgcft3ws'
						}, {
							author: '',
							text: 'hello to you, too'
						}]
					}]
				};

				var $root = $('#root');
				$root.html(template(data));

				runTests($root, data);
			});
		});
	});
});
