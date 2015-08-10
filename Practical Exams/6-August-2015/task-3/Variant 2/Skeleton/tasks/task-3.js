function solve() {
    return function (selector) {
        var template = '<div class="event-calendar">' +
                '<h2 class="header">Appointments for <span class="month">{{month}}</span> <span class="year">{{year}}</span></h2>' +
                '{{#days}}' +
                    '<div class="col-date">' +
                        '<div class="date">{{day}}</div>' +
                        '<div class="events">' +
                            '{{#each events}}' +
                                '{{#if title}}' +
                                    '<div class="event {{importance}}" title="duration: {{duration}}">' +
                                        '<div class="title">{{title}}</div>' +
                                        '<span class="time">at: {{time}}</span>' +
                                    '</div>' +
                                '{{else}}' +
                                    '<div class="event {{importance}}">' +
                                        '<div class="title">Free slot</div>' +
                                    '</div>' +
                                '{{/if}}' +
                            '{{/each}}' +
                        '</div>' +
                    '</div>' +
                '{{/days}}' +
        '</div>';		
        document.getElementById(selector).innerHTML = template;
    };
}

module.exports = solve;