window.onload = function () {
  var authors = [{
    name: 'Doncho Minkov',
    image: 'images/doncho.jpg',
    titles: ['Technical <b>Trainer</b>', 'some other title'],
    urls: ['http://minkov.it', 'https://github.com/Minkov'],
    right: false,
  }, {
    name: 'Evlogi Hristov',
    image: 'images/evlogi.jpg',
    titles: ['Technical <b>Trainer</b>'],
    urls: ['https://github.com/EvlogiHr'],
    right: true,
  }, {
    name: 'Martin Veshev',
    image: 'images/marto.jpg',
    titles: ['Technical <b>Trainer</b>'],
    urls: ['https://github.com/vesheff'],
    right: false,
  }, {
    id: 4,
    name: 'Konstantin Simeonov',
    image: 'images/koce.jpg',
    titles: ['Technical <b>Trainer</b>', 'some other title'],
    urls: ['https://github.com/KonstantinSimeonov'],
    right: true,
  }];
	 
  var authorsListContainer = document.getElementById('authors'),
    authorsListTemplate = Handlebars.compile((document.getElementById('authors-template')).innerHTML);

  // empty the container
  while (authorsListContainer.firstChild) {
    authorsListContainer.removeChild(authorsListContainer.firstChild);
  }

  authorsListContainer.innerHTML = authorsListTemplate({
    authors: authors
  });
};