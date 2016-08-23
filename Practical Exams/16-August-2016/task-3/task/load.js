/*
 ____   ___    _   _  ___ _____   _____ ____ ___ _____ 
|  _ \ / _ \  | \ | |/ _ \_   _| | ____|  _ \_ _|_   _|
| | | | | | | |  \| | | | || |   |  _| | | | | |  | |  
| |_| | |_| | | |\  | |_| || |   | |___| |_| | |  | |  
|____/ \___/  |_| \_|\___/ |_|   |_____|____/___| |_|  

 _____ _   _ ___ ____    _____ ___ _     _____ 
|_   _| | | |_ _/ ___|  |  ___|_ _| |   | ____|
  | | | |_| || |\___ \  | |_   | || |   |  _|  
  | | |  _  || | ___) | |  _|  | || |___| |___ 
  |_| |_| |_|___|____/  |_|   |___|_____|_____|

*/

(function() {
	var template = Handlebars.compile(solve()());

	// Sample test 1

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

	// Sample test 2

	// var data = {
	// 	title: 'JS UI & DOM 2016',
	// 	posts: [{
	// 		author: 'Cuki',
	// 		text: 'Hello guys',
	// 		comments: [{
	// 			author: 'Kon',
	// 			text: 'Hello'
	// 		}, {
	// 			text: 'Hello'
	// 		}]
	// 	}, {
	// 		author: 'Cuki',
	// 		text: 'This works',
	// 		comments: [{
	// 			author: 'Cuki',
	// 			text: 'Well, ofcourse!\nRegards'
	// 		}, {
	// 			text: 'You are fat',
	// 			deleted: true
	// 		}]
	// 	}, {
	// 		author: 'Pesho',
	// 		text: 'Is anybody out <a href="https://facebook.com/">there</a>?',
	// 		comments: []
	// 	}]
	// };

	document.getElementById('forum-container')
		.innerHTML = template(data);
}());
