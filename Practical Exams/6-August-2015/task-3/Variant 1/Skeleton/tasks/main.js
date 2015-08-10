window.onload = function () {
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
	
    var calendarListContainer = document.getElementById('calendar');
    var calendarListTemplate = Handlebars.compile((document.getElementById('calendar-template')).innerHTML);

    calendarListContainer.innerHTML = calendarListTemplate(data);
};