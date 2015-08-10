/*globals describe, it, require, before, global, $*/
var expect = require('chai').expect;
var jsdom = require('jsdom');
var jq = require('jquery');
var result = require('../tasks/task-3')();
var handlebars = require('handlebars');

describe('Task #3 Tests', function () {

    before(function (done) {
        jsdom.env({
            html: '',
            done: function (errors, window) {
                global.window = window;
                global.document = window.document;
                global.$ = jq(window);
                Object.keys(window)
                  .filter(function (prop) {
                      return prop.toLowerCase().indexOf('html') >= 0;
                  }).forEach(function (prop) {
                      global[prop] = window[prop];
                  });
                done();
            }
        });
    });

	// 0
	it('expect to generate the HTML with the example data', function () {
        document.body.innerHTML = '<script id="template"></script>';
        var $myJQuery = $;
        $ = undefined; // disable jQuery for the result
        result('template');
        $ = $myJQuery;

        var data = {
        year: 2015,
        month: 'August',
        days: [{
            day: 3,
            events: [{
                duration: 765,
                importance: 'none'
            }, {
                title: 'My Event 1',
                time: '12:45',
                duration: 60,
                comment: 'no comment',
                importance: 'critical'
            }, {
                duration: 15,
                importance: 'none'
            }, {
                title: 'My Event 2',
                time: '14:00',
                duration: 120,
                comment: 'no comment',
                importance: 'important'
            }, {
                duration: 60,
                importance: 'none'
            }, {
                title: 'My Event 4',
                time: '17:00',
                duration: 60,
                comment: 'no comment',
                importance: 'unimportant'
            }, {
                duration: 360,
                importance: 'none'
            }]
        }, {
            day: 4,
            events: [{
                duration: 750,
                importance: 'none'
            }, {
                title: 'Prepare for the Exam',
                time: '12:30',
                duration: 480,
                comment: 'no comment',
                importance: 'important'
            }, {
                duration: 210,
                importance: 'none'
            }],
        }, {
            day: 5,
            events: [{
                duration: 1320,
                importance: 'none'
            }, {
                title: 'PARTY',
                time: '22:00',
                duration: 120,
                comment: 'I must be there',
                importance: 'unimportant'
            }],
        }, {
            day: 6,
            events: [{
                title: 'PARTY',
                time: '0:00',
                duration: 180,
                comment: 'I must be there',
                importance: 'unimportant'
            }, {
                duration: 390,
                importance: 'none'
            }, {
                title: 'JS UI & DOM Exam',
                time: '9:30',
                duration: 780,
                comment: 'Keep your fingers crossed',
                importance: 'critical'
            }, {
                duration: 90,
                importance: 'none'
            }],
        }, {
            day: 7,
            events: [{
                title: 'Vacation',
                time: '0:00',
                duration: 1440,
                comment: 'Finaly some time to relax',
                importance: 'vacation'
            }],
        }, {
            day: 8,
            events: [{
                title: 'Vacation',
                time: '0:00',
                duration: 1440,
                comment: 'Finaly some time to relax',
                importance: 'vacation'
            }],
        }, {
            day: 9,
            events: [{
                title: 'Vacation',
                time: '0:00',
                duration: 1440,
                comment: 'Finaly some time to relax',
                importance: 'vacation'
            }],
        }]
    };
	
        var template = handlebars.compile($('#template').html());
        var compiledHTML = template(data);
        document.body.innerHTML = compiledHTML;

        var $calendar = $('.event-calendar');
        expect($calendar).to.has.length(1);	
		
        var $header = $calendar.find('.header');
        expect($header).to.has.length(1);
		
		var $month = $header.find('.month');
        expect($month).to.has.length(1);
        expect($month[0].innerHTML).to.equal(data.month);

        var $year = $header.find('.year');
        expect($year).to.has.length(1);
        expect($year[0].innerHTML).to.equal(data.year + '');
		
        var $days = $calendar.find('.col-date');			
        expect($days).to.has.length(data.days.length);
		
        var $events = $calendar.find('.event');
        expect($events).to.has.length(19);
		
		var $critical = $calendar.find('.event.critical');
		var $important = $calendar.find('.event.important');
		var $unimportant = $calendar.find('.event.unimportant');
		var $vacation = $calendar.find('.event.vacation');
		var $none = $calendar.find('.event.none');
        expect($critical).to.has.length(2);
        expect($important).to.has.length(2);
        expect($unimportant).to.has.length(3);
        expect($vacation).to.has.length(3);
        expect($none).to.has.length(9);
    });
    // 1
    it('expect to generate an element with class .events-calendar', function () {
        document.body.innerHTML = '<script id="template"></script>';
        var $myJQuery = $;
        $ = undefined; // disable jQuery for the result
        result('template');
        $ = $myJQuery;

        var data = {
            year: 2015,
            month: 'July',
            days: []
        };

        var template = handlebars.compile($('#template').html());
        var compiledHTML = template(data);
        document.body.innerHTML = compiledHTML;

        var $calendar = $('.event-calendar');
        expect($calendar).to.has.length(1);
    });
    // 2 
    it('expect to generate a single element with class .header in the .events-calendar', function () {
        document.body.innerHTML = '<script id="template"></script>';
        var $myJQuery = $;
        $ = undefined; // disable jQuery for the result
        result('template');
        $ = $myJQuery;

        var data = {
            year: 2015,
            month: 'July',
            days: []
        };

        var template = handlebars.compile($('#template').html());
        var compiledHTML = template(data);
        document.body.innerHTML = compiledHTML;

        var $calendar = $('.event-calendar');

        var $header = $calendar.find('.header');
        expect($header).to.has.length(1);
    });
    // 3
    it('expect header to have span with class .month and span with class .year', function () {
        document.body.innerHTML = '<script id="template"></script>';
        var $myJQuery = $;
        $ = undefined; // disable jQuery for the result
        result('template');
        $ = $myJQuery;

        var data = {
            year: 2015,
            month: 'July',
            days: []
        };

        var template = handlebars.compile($('#template').html());
        var compiledHTML = template(data);
        document.body.innerHTML = compiledHTML;

        var $calendar = $('.event-calendar');
        var $header = $calendar.find('.header');
        expect($header).to.has.length(1);

        var $month = $header.find('.month');
        expect($month).to.has.length(1);
        expect($month[0].innerHTML).to.equal(data.month);

        var $year = $header.find('.year');
        expect($year).to.has.length(1);
        expect($year[0].innerHTML).to.equal(data.year + '');
    });
    // 4
    it('expect to generate element with class .col-date that contains an element with class .event', function () {
        document.body.innerHTML = '<script id="template"></script>';
        var $myJQuery = $;
        $ = undefined; // disable jQuery for the result
        result('template');
        $ = $myJQuery;

        var data = {
            year: 2015,
            month: 'July',
            days: [{
                day: 3,
                events: [{
                    title: 'My Event 1',
                    time: '12:00',
                    duration: 60,
                    comment: 'no comment',
                    importance: 'critical'
                }]
            }]
        };

        var template = handlebars.compile($('#template').html());
        var compiledHTML = template(data);
        document.body.innerHTML = compiledHTML;

        var $calendar = $('.event-calendar');

        var $days = $calendar.find('.col-date');
        expect($days).to.has.length(data.days.length);
    });
    // 5
    it('expect to contain DAYS COUNT .col-date each with EVENTS COUNT events in it', function () {
        document.body.innerHTML = '<script id="template"></script>';
        var $myJQuery = $;
        $ = undefined; // disable jQuery for the result
        result('template');
        $ = $myJQuery;

        var days = [],
			daysCount = (Math.random() * 10 + 5) | 0, // 5,
			eventsCount = (Math.random() * 10 + 4) | 0; // 3;

        for (var i = 0; i < daysCount; i += 1) {
            var day = {
                day: i + 10,
                events: []
            };

            for (var j = 0; j < eventsCount; j += 1) {
                day.events.push({
                    title: 'My Event ' + j,
                    time: (8 + j) + ':00',
                    duration: 60,
                    comment: 'no comment',
                    importance: 'critical'
                });
            }

            days.push(day);
        }

        var data = {
            year: 2015,
            month: 'July',
            days: days
        };

        var template = handlebars.compile($('#template').html());
        var compiledHTML = template(data);
        document.body.innerHTML = compiledHTML;

        var $calendar = $('.event-calendar');
        var $days = $calendar.find('.col-date');
        expect($days).to.has.length(data.days.length);

        $days.each(function (i, day) {
            var $events = $(day).find('.event');
            expect($events).to.has.length(eventsCount);
        });
    });
    // 6
    it('expect .event to have the provided class for importance', function () {
        document.body.innerHTML = '<script id="template"></script>';
        var $myJQuery = $;
        $ = undefined; // disable jQuery for the result
        result('template');
        $ = $myJQuery;

        var importance = ['critical', 'important', 'unimportant', 'vacation'],
            i, len = 5, events = [], data, template, compiledHTML;

        for (i = 0; i < len; i += 1) {
            events.push({
                title: 'My Event ' + i,
                time: '12:00',
                duration: 60,
                comment: 'no comment',
                importance: importance[i % importance.length]
            });
        }

        data = {
            year: 2015,
            month: 'July',
            days: [{
                day: 3,
                events: events
            }]
        };

        template = handlebars.compile($('#template').html());
        compiledHTML = template(data);
        document.body.innerHTML = compiledHTML;

        var $calendar = $('.event-calendar');
        var $days = $calendar.find('.col-date');
        expect($days).to.has.length(data.days.length);

        var $events = $days.first().find('.event');
        expect($events).to.has.length(events.length);

        $events.each(function (i, event) {
            expect($(event).hasClass(importance[i % importance.length])).to.equal(true);
        });
    });
    // 7
    it('expect .event to have element with class .title and to have the provided content', function () {
        document.body.innerHTML = '<script id="template"></script>';
        var $myJQuery = $;
        $ = undefined; // disable jQuery for the result
        result('template');
        $ = $myJQuery;

        var days = [],
			daysCount = 1,
			eventsCount = (Math.random() * 10 + 5) | 0; // 5;

        for (var i = 0; i < daysCount; i += 1) {
            var day = {
                day: i + 10,
                events: []
            };

            for (var j = 0; j < eventsCount; j += 1) {
                day.events.push({
                    title: 'My Event ' + j,
                    time: (8 + j) + ':00',
                    duration: 60,
                    comment: 'no comment',
                    importance: 'critical'
                });
            }

            days.push(day);
        }

        var data = {
            year: 2015,
            month: 'July',
            days: days
        };

        var template = handlebars.compile($('#template').html());
        var compiledHTML = template(data);
        document.body.innerHTML = compiledHTML;

        var $calendar = $('.event-calendar');

        var $events = $calendar.find('.event');
		expect($events).to.have.length(eventsCount);
			
        var $title;
        $events.each(function (i, event) {
            $title = $(event).find('.title');
            expect($title).to.have.length(1);
            expect($title[0].innerHTML).to.equal(data.days[0].events[i].title);
        });
    });
    // 8
    it('expect .event to have the provided content', function () {
        document.body.innerHTML = '<script id="template"></script>';
        var $myJQuery = $;
        $ = undefined; // disable jQuery for the result
        result('template');
        $ = $myJQuery;

        var days = [],
            daysCount = (Math.random() * 10 + 5) | 0, // 5,
            eventsCount = (Math.random() * 10 + 10) | 0, // 10,
            i, j,
			importance = ['critical', 'important', 'unimportant', 'vacation'];

        for (i = 0; i < daysCount; i += 1) {
            var day = {
                day: i + 10,
                events: []
            };

            for (j = 0; j < eventsCount; j += 1) {
                day.events.push({
                    title: 'My Event ' + j,
                    time: (8 + j) + ':00',
                    duration: 60 * (j + 1),
                    comment: 'no comment',
                    importance: importance[j % 4]
                });
            }

            days.push(day);
        }

        var data = {
            year: 2015,
            month: 'July',
            days: days
        };

        var template = handlebars.compile($('#template').html());
        var compiledHTML = template(data);
        document.body.innerHTML = compiledHTML;

        var $calendar = $('.event-calendar');
        var $days = $calendar.find('.col-date');
        expect($days).to.has.length(data.days.length);

        var $events, $title, $time;
        $days.each(function (i, day) {
            $events = $(day).find('.event');
            expect($events).to.has.length(eventsCount);

            $events.each(function (j, event) {
                expect($(event).hasClass(importance[j % 4])).to.equal(true);

                $title = $(event).find('.title');
                $time = $(event).find('.time');

                expect($title[0].innerHTML).to.equal('My Event ' + j);
                expect($time[0].innerHTML).to.equal('at: ' + (j + 8) + ':00');
            });
        });
    });
    // 9
    it('expect .title to have content "Free slot" when title missing', function () {
        document.body.innerHTML = '<script id="template"></script>';
        var $myJQuery = $;
        $ = undefined; // disable jQuery for the result
        result('template');
        $ = $myJQuery;


        var data = {
            year: 2015,
            month: 'July',
            days: [{
                day: 3,
                events: [{
                    time: '12:00',
                    importance: 'critical'
                }, {
                    title: 'My Event 1',
                    time: '12:00',
                    importance: 'critical'
                }, {
                    importance: 'critical'
                }]
            }]
        };


        var template = handlebars.compile($('#template').html());
        var compiledHTML = template(data);
        document.body.innerHTML = compiledHTML;

        var $calendar = $('.event-calendar');
        var $days = $calendar.find('.col-date');

        var $titles = $days.first().find('.title');
        expect($titles[0].innerHTML).to.equal('Free slot');
        expect($titles[2].innerHTML).to.equal('Free slot');
    });
    // 10
    it('expect .event to have attribute title with content equal to COMMENT', function () {
        document.body.innerHTML = '<script id="template"></script>';
        var $myJQuery = $;
        $ = undefined; // disable jQuery for the result
        result('template');
        $ = $myJQuery;

        var len = (Math.random() * 10 + 4) | 0;
			
        var events = [];
        for (var i = 0; i < len; i+=1) {
            events.push({
                title: 'My Event ' + i,
                duration: 60 * (i + 1),
                importance: 'critical'
            });
        }

        var data = {
            year: 2015,
            month: 'July',
            days: [{
                day: 3,
                events: events
            }]
        };

        var template = handlebars.compile($('#template').html());
        var compiledHTML = template(data);
        document.body.innerHTML = compiledHTML;

        var $calendar = $('.event-calendar');
        var $days = $calendar.find('.col-date');

        var $events = $days.first().find('.event');
        expect($events).to.has.length(data.days[0].events.length);

        $events.each(function (i, el) {
            expect($(el).prop('title')).to.equal('duration: ' + 60 * (i + 1));
        });
    });
});