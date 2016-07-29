var expect = require('chai').expect;
var jsdom = require('jsdom');
var jq = require('jquery');
var result = require('../task/solution');
var handlebars = require('handlebars');

describe('Task #2 Tests - Datepicker', function () {

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

    it('should be wrapped in parent', function () {
        document.body.innerHTML = '<input type="text" id="date" />';
        result();
        $('#date').datepicker();
        var parent = $('input').parent();
        var parentClass = parent.hasClass('datepicker-wrapper');
        expect(parentClass).to.be.true;
        expect(parent.children().length).to.be.above(1);
    });

    it('should be shown on input click', function () {
        document.body.innerHTML = '<input type="text" id="date" />';
        result();
        var datepicker = $('#date').datepicker();
        var element = $('.datepicker-wrapper .picker');
        var isVisibleBefore = element.hasClass('picker-visible');
        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, true);
        datepicker[0].dispatchEvent(event);
		
		var focusEvent = document.createEvent('Event');
		focusEvent.initEvent('focus', true, true);
		datepicker[0].dispatchEvent(focusEvent);
		
        var isVisibleAfter = element.hasClass('picker-visible');

        expect(isVisibleBefore).to.be.false;
        expect(isVisibleAfter).to.be.true;
    });

    it('should have controls, calendar and current-date', function () {
        document.body.innerHTML = '<input type="text" id="date" />';
        result();
        var datepicker = $('#date').datepicker();

        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, true);
        datepicker[0].dispatchEvent(event);

		var focusEvent = document.createEvent('Event');
		focusEvent.initEvent('focus', true, true);
		datepicker[0].dispatchEvent(focusEvent);
		
        var element = $('.datepicker-wrapper .picker');

        var controls = element.find('.controls');
        var buttons = controls.find('.btn');

        var calendar = element.find('.calendar');
        var rows = calendar.find('tr');
        var totalCols = calendar.find('td');

        var currentDate = element.find('.current-date');
        var link = currentDate.find('.current-date-link');

        expect(controls).to.have.length(1);
        expect(buttons).to.have.length(2);

        expect(calendar).to.have.length(1);
        expect(rows).to.have.length(7);
        expect(totalCols).to.have.length(42);
        rows.each(function (index, element) {
            var cells = $(element).children();
            expect(cells).to.have.length(7);
        });

        expect(currentDate).to.have.length(1);
        expect(link).to.have.length(1);
    });

    it('should have correct controls', function () {
        document.body.innerHTML = '<input type="text" id="date" />';
        result();
        var datepicker = $('#date').datepicker();

        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, true);
        datepicker[0].dispatchEvent(event);

		var focusEvent = document.createEvent('Event');
		focusEvent.initEvent('focus', true, true);
		datepicker[0].dispatchEvent(focusEvent);
		
        var element = $('.datepicker-wrapper .picker');
        var controls = element.find('.controls');
        var currentMonth = controls.find('.current-month');

        var MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var WEEK_DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

        Date.prototype.getMonthName = function () {
            return MONTH_NAMES[this.getMonth()];
        };

        Date.prototype.getDayName = function () {
            return WEEK_DAY_NAMES[this.getDay()];
        };

        var date = new Date();
        expect(currentMonth.text()).to.equal(date.getMonthName() + ' ' + date.getFullYear());

        var btns = controls.find('.btn');
        var leftBtn = btns[0];
        var rightBtn = btns[1];

        for (var i = 0; i < 13; i++) {
            event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, true);
            leftBtn.dispatchEvent(event);
        }

        date.setMonth(date.getMonth() - 13);
        expect(currentMonth.text()).to.equal(date.getMonthName() + ' ' + date.getFullYear());

        for (var i = 0; i < 26; i++) {
            event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, true);
            rightBtn.dispatchEvent(event);
        }

        date.setMonth(date.getMonth() + 26);
        expect(currentMonth.text()).to.equal(date.getMonthName() + ' ' + date.getFullYear());
    });

    it('should have correct current month table', function () {
        document.body.innerHTML = '<input type="text" id="date" />';
        result();
        var datepicker = $('#date').datepicker();

        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, true);
        datepicker[0].dispatchEvent(event);

		var focusEvent = document.createEvent('Event');
		focusEvent.initEvent('focus', true, true);
		datepicker[0].dispatchEvent(focusEvent);
		
        var element = $('.datepicker-wrapper .picker');
        var calendar = element.find('.calendar');

        var MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var WEEK_DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

        Date.prototype.getMonthName = function () {
            return MONTH_NAMES[this.getMonth()];
        };

        Date.prototype.getDayName = function () {
            return WEEK_DAY_NAMES[this.getDay()];
        };

        var cells = [];
        calendar.find('th').each(function (index, element) {
            cells.push($(element).text());
        });

        calendar.find('td').each(function (index, element) {
            cells.push(parseInt($(element).text()));
        });

        for (var i = 0; i < 7; i++) {
            expect(cells[i]).to.equal(WEEK_DAY_NAMES[i]);
        }

        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth();
        var firstDayOfMonth = new Date(year, month, 1);
        var prevFirstDayOfMonth = new Date(year, month - 1, 1);
        var firstDayOfMonthWeekDay = firstDayOfMonth.getDay();
        var currentLastDayOfMonth = new Date(firstDayOfMonth.setMonth(month + 1) - 1).getDate();
        var prevLastDayOfMonth = new Date(prevFirstDayOfMonth.setMonth(month) - 1).getDate();

        var current = prevLastDayOfMonth - firstDayOfMonthWeekDay;
        var prevChecked = false;

        for (var i = 7; i < cells.length; i++) {
            current++;
            if (!prevChecked && current > prevLastDayOfMonth) {
                current = 1;
                prevChecked = true;
            }
            else if (prevChecked && current > currentLastDayOfMonth) {
                current = 1;
            }

            expect(cells[i]).to.equal(current);
        }
    });

    it('should have correct next and previous month table', function () {
        document.body.innerHTML = '<input type="text" id="date" />';
        result();
        var datepicker = $('#date').datepicker();

        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, true);
        datepicker[0].dispatchEvent(event);

		var focusEvent = document.createEvent('Event');
		focusEvent.initEvent('focus', true, true);
		datepicker[0].dispatchEvent(focusEvent);
		
        var element = $('.datepicker-wrapper .picker');
        var controls = element.find('.controls');

        var MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var WEEK_DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

        Date.prototype.getMonthName = function () {
            return MONTH_NAMES[this.getMonth()];
        };

        Date.prototype.getDayName = function () {
            return WEEK_DAY_NAMES[this.getDay()];
        };

        var date = new Date();

        var btns = controls.find('.btn');
        var leftBtn = btns[0];
        var rightBtn = btns[1];

        for (var i = 0; i < 13; i++) {
            event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, true);
            leftBtn.dispatchEvent(event);
        }

        testTable(date, -13);

        for (var i = 0; i < 26; i++) {
            event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, true);
            rightBtn.dispatchEvent(event);
        }

        testTable(date, 26);

        function testTable(date, number) {
            date.setMonth(date.getMonth() + number);
            var cells = [];
            var calendar = element.find('.calendar');
            calendar.find('th').each(function (index, element) {
                cells.push($(element).text());
            });

            calendar.find('td').each(function (index, element) {
                cells.push(parseInt($(element).text()));
            });

            for (var i = 0; i < 7; i++) {
                expect(cells[i]).to.equal(WEEK_DAY_NAMES[i]);
            }

            var year = date.getFullYear();
            var month = date.getMonth();
            var firstDayOfMonth = new Date(year, month, 1);
            var prevFirstDayOfMonth = new Date(year, month - 1, 1);
            var firstDayOfMonthWeekDay = firstDayOfMonth.getDay();
            var currentLastDayOfMonth = new Date(firstDayOfMonth.setMonth(month + 1) - 1).getDate();
            var prevLastDayOfMonth = new Date(prevFirstDayOfMonth.setMonth(month) - 1).getDate();

            var current = prevLastDayOfMonth - firstDayOfMonthWeekDay;
            var prevChecked = false;

            for (var i = 7; i < cells.length; i++) {
                current++;
                if (!prevChecked && current > prevLastDayOfMonth) {
                    current = 1;
                    prevChecked = true;
                }
                else if (prevChecked && current > currentLastDayOfMonth) {
                    current = 1;
                }

                expect(cells[i]).to.equal(current);
            }
        }
    });

    it('should populate the input value correctly when selecting from the table', function () {
        document.body.innerHTML = '<input type="text" id="date" />';
        result();
        var datepicker = $('#date').datepicker();

        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, true);
        datepicker[0].dispatchEvent(event);

		var focusEvent = document.createEvent('Event');
		focusEvent.initEvent('focus', true, true);
		datepicker[0].dispatchEvent(focusEvent);
		
        var element = $('.datepicker-wrapper .picker');
        var controls = element.find('.controls');

        var MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var WEEK_DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

        Date.prototype.getMonthName = function () {
            return MONTH_NAMES[this.getMonth()];
        };

        Date.prototype.getDayName = function () {
            return WEEK_DAY_NAMES[this.getDay()];
        };

        var date = new Date();

        var btns = controls.find('.btn');
        var leftBtn = btns[0];
        var rightBtn = btns[1];

        for (var i = 0; i < 2; i++) {
            event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, true);
            leftBtn.dispatchEvent(event);
        }

        testTable(date, -2, 15);

        for (var i = 0; i < 4; i++) {
            event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, true);
            rightBtn.dispatchEvent(event);
        }

        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, true);
        datepicker[0].dispatchEvent(event);
		
		var focusEvent = document.createEvent('Event');
		focusEvent.initEvent('focus', true, true);
		datepicker[0].dispatchEvent(focusEvent);

        testTable(date, 4, 15);

        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, true);
        datepicker[0].dispatchEvent(event);
		
		var focusEvent = document.createEvent('Event');
		focusEvent.initEvent('focus', true, true);
		datepicker[0].dispatchEvent(focusEvent);

        testTable(date, 0, 8);

        function testTable(date, number, cellIndex) {
            date.setMonth(date.getMonth() + number);
            var cells = [];
            var calendar = element.find('.calendar');
            calendar.find('th').each(function (index, element) {
                cells.push(element);
            });

            calendar.find('td').each(function (index, element) {
                cells.push(element);
            });

            var year = date.getFullYear();
            var month = date.getMonth();
            var firstDayOfMonth = new Date(year, month, 1);
            var prevFirstDayOfMonth = new Date(year, month - 1, 1);
            var firstDayOfMonthWeekDay = firstDayOfMonth.getDay();
            var currentLastDayOfMonth = new Date(firstDayOfMonth.setMonth(month + 1) - 1).getDate();
            var prevLastDayOfMonth = new Date(prevFirstDayOfMonth.setMonth(month) - 1).getDate();

            var current = prevLastDayOfMonth - firstDayOfMonthWeekDay;
            var prevChecked = false;

            var currentCellIndex;
            var correctValue;

            for (var i = 7; i < cellIndex; i++) {
                current++;
                if (!prevChecked && current > prevLastDayOfMonth) {
                    current = 1;
                    prevChecked = true;
                }
                else if (prevChecked && current > currentLastDayOfMonth) {
                    current = 1;
                }

                currentCellIndex = i;
                correctValue = current;
            }

            var event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, true);
            cells[currentCellIndex].dispatchEvent(event);

            var isVisible = $('.datepicker-wrapper .picker').hasClass('picker-visible');
            if ($(cells[currentCellIndex]).hasClass('current-month')) {
                expect(isVisible).to.be.false;
                expect($('#date').val()).to.equal(correctValue + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
            }
            else {
                expect(isVisible).to.be.true;
            }
        }
    });

    it('should select current date when selecting from the bottom of the control', function () {
        document.body.innerHTML = '<input type="text" id="date" />';
        result();
        var datepicker = $('#date').datepicker();

        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, true);
        datepicker[0].dispatchEvent(event);
		
		var focusEvent = document.createEvent('Event');
		focusEvent.initEvent('focus', true, true);
		datepicker[0].dispatchEvent(focusEvent);

        var element = $('.datepicker-wrapper .picker');
        var controls = element.find('.controls');

        var MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var WEEK_DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

        Date.prototype.getMonthName = function () {
            return MONTH_NAMES[this.getMonth()];
        };

        Date.prototype.getDayName = function () {
            return WEEK_DAY_NAMES[this.getDay()];
        };

        var date = new Date();

        event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, true);
        $('.datepicker-wrapper .current-date-link')[0].dispatchEvent(event);

        var isVisible = $('.datepicker-wrapper .picker').hasClass('picker-visible');
        expect(isVisible).to.be.false;
        expect($('#date').val()).to.equal(date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
    });

    it('should hide the picker if clicked outside the element', function () {
        document.body.innerHTML = '<div><input type="text" id="date" /></div><div id="outside"></div>';
        result();
        var datepicker = $('#date').datepicker();

        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, true);
        datepicker[0].dispatchEvent(event);
		
		var focusEvent = document.createEvent('Event');
		focusEvent.initEvent('focus', true, true);
		datepicker[0].dispatchEvent(focusEvent);

        var isVisible = $('.datepicker-wrapper .picker').hasClass('picker-visible');
        expect(isVisible).to.be.true;

        event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, true);
        $('#outside')[0].dispatchEvent(event);

        var isVisible = $('.datepicker-wrapper .picker').hasClass('picker-visible');
        expect(isVisible).to.be.false;
    });

    it('should support chaining', function () {
        document.body.innerHTML = '<input type="text" id="date" />';
        result();
        var datepicker = $('#date').datepicker().addClass('test');

        expect($('#date').hasClass('test')).to.be.true;
    });
});