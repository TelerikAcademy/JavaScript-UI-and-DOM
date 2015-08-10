function solve() {
    $.fn.datepicker = function () {
        var MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var WEEK_DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

        Date.prototype.getMonthName = function () {
            return MONTH_NAMES[this.getMonth()];
        };

        Date.prototype.getDayName = function () {
            return WEEK_DAY_NAMES[this.getDay()];
        };

        var $this = this;
        var now = new Date();
        var currentDate = new Date();
        var wrapper = $('<div />').addClass('datepicker-wrapper');
        $this.addClass('datepicker').wrap(wrapper);
        wrapper = $this.parent();

        var picker = $('<div />').addClass('picker');
        var controls = $('<div />').addClass('controls').appendTo(picker);

        var leftBtn = $('<button />').addClass('btn btn-previous').text('<').attr('data-operation', '-1').appendTo(controls);
        var innerMonth = $('<div />').addClass('current-month').text(currentDate.getMonthName() + ' ' + currentDate.getFullYear()).appendTo(controls);
        var rightBtn = $('<button />').addClass('btn btn-next').text('>').attr('data-operation', '1').appendTo(controls);

        var calendar = buildCalendar().appendTo(picker);

        var currentDateDiv = $('<div />').addClass('current-date').appendTo(picker);
        $('<a />')
            .attr('href', '#')
            .addClass('current-date-link')
            .text(currentDate.getDate() + ' ' + currentDate.getMonthName() + ' ' + currentDate.getFullYear())
            .appendTo(currentDateDiv)
            .on('click', function () {
                setValue(now);
                togglePickerVisibility();
            });

        $this.on('click', function () {
            togglePickerVisibility();
        });

        function buildCalendar(date) {
            var CALENDAR_ROWS = 6;
            date = date || new Date();
            var year = year || date.getFullYear();
            var month = month || date.getMonth();
            var calendar = $('<table />').addClass('calendar');
            var headerRow = $('<tr />').appendTo(calendar);
            for (var i = 0, len = WEEK_DAY_NAMES.length; i < len; i++) {
                $('<th />').text(WEEK_DAY_NAMES[i]).appendTo(headerRow);
            }

            var firstDayOfMonth = new Date(year, month, 1);
            var firstDayOfMonthWeekDay = firstDayOfMonth.getDay();
            var lastDayOfMonth = new Date(firstDayOfMonth.setMonth(month + 1) - 1).getDate();

            var previousMonthRendered = false;
            var inNextMonth = false;
            var startNext = 0;
            var currentDayRendered = 1;

            for (var i = 0; i < CALENDAR_ROWS; i++) {
                var row = $('<tr />').appendTo(calendar);
                // previous month numbers
                if (!previousMonthRendered) {
                    var previousMonthDays = firstDayOfMonthWeekDay;
                    var previousFirstDayOfMonth = new Date(year, month - 1, 1);
                    var previousMonthLastDay = new Date(previousFirstDayOfMonth.setMonth(month) - 1).getDate();
                    var startIndex = previousMonthLastDay - previousMonthDays + 1;
                    if (startIndex > previousMonthLastDay) {
                        startIndex -= 7;
                    }

                    for (var j = startIndex, len = previousMonthLastDay; j <= len; j++) {
                        $('<td />').addClass('another-month').text(j).appendTo(row);
                        startNext++;
                    }
                    previousMonthRendered = true;
                }

                // current month numbers
                for (var j = startNext; j < 7; j++) {
                    var cell = $('<td />').text(currentDayRendered).appendTo(row);
                    if (!inNextMonth) {
                        cell.addClass('current-month');
                    }
                    else {
                        // next month numbers
                        cell.addClass('another-month');
                    }

                    currentDayRendered++;
                    if (currentDayRendered > lastDayOfMonth) {
                        currentDayRendered = 1;
                        inNextMonth = true;
                    }

                    startNext++;
                }

                startNext = 0;
            }

            return calendar;
        }

        controls.on('click', 'button', function () {
            var operation = parseInt($(this).data('operation'));
            var date = new Date(currentDate.setMonth(currentDate.getMonth() + operation));
            buildCalendar(date).replaceAll('.calendar');
            setInnerMonth(date);
        });

        wrapper.on('click', 'td.current-month', function () {
            var $this = $(this);
            setValue(new Date(currentDate.setDate($this.text())));
            togglePickerVisibility();
        });

        $(document).click(function (ev) {
            if (!$(ev.target).parents('.datepicker-wrapper').length) {
                if (picker.hasClass('picker-visible')) {
                    togglePickerVisibility();
                }
            }
        });

        function setInnerMonth(date) {
            innerMonth.text(date.getMonthName() + ' ' + date.getFullYear());
        }

        function setValue(date) {
            $this.val(date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
        }

        function togglePickerVisibility() {
            picker.toggleClass('picker-visible');
        }

        // append control to DOM
        wrapper.append(picker);

        return $this;
    };
};

module.exports = solve;