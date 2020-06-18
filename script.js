var date_picker_element = document.querySelector('.date-picker');
var selected_date_element = document.querySelector('.date-picker .selected-date');
var dates_element = document.querySelector('.date-picker .dates');
var mth_element = document.querySelector('.date-picker .dates .month .mth');
var next_mth_element = document.querySelector('.date-picker .dates .month .next-mth');
var prev_mth_element = document.querySelector('.date-picker .dates .month .prev-mth');
var weekDays_element = document.querySelector('.date-picker .dates .week');
var days_element = document.querySelector('.date-picker .dates .days');
var months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
var daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
date_picker_element.addEventListener('click', toggleDatePicker);
var date = new Date();
var day = date.getDate();
var dayOfWeek = date.getDay();
var month = date.getMonth();
var year = date.getFullYear();
var selectedDate = date;
var selectedDay = day;
var selectedMonth = month;
var selectedYear = year;
var selectedDayOfWeek = dayOfWeek;
var monthAndYear = document.getElementsByClassName('dates');
mth_element.textContent = months[month] + ' ' + year;
// weekDays_element.textContent = weekDays;
selected_date_element.textContent = formatDate(date);
selected_date_element.dataset.value = selectedDate;
populateDates();
date_picker_element.addEventListener('click', toggleDatePicker);
next_mth_element.addEventListener('click', goToNextMonth);
prev_mth_element.addEventListener('click', goToPrevMonth);
function toggleDatePicker(e) {
    if (!checkEventPathForClass(e.path, 'dates')) {
        dates_element.classList.toggle('active');
    }
}
function goToNextMonth(e) {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    mth_element.textContent = months[month] + ' ' + year;
    populateDates();
}
function goToPrevMonth(e) {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    mth_element.textContent = months[month] + ' ' + year;
    populateDates();
}
function populateDates(e) {
    days_element.innerHTML = '';
    // weekDays_element.innerHTML = '';
    var currentDate = new Date(year, month, 1);
    var weekDay = currentDate.getDay();
    weekDay = weekDay === 0 ? 7 : weekDay;
    currentDate.setDate(currentDate.getDate() - (weekDay - 1));
    function daysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
    }
    var _loop_1 = function (i) {
        var day_1 = currentDate.getDate();
        var day_element = document.createElement('div');
        day_element.classList.add('day');
        day_element.textContent = day_1;
        if (currentDate.getMonth() != month) {
            day_element.style.color = "gray";
        }
        if (selectedDay == day_1 && selectedYear == year && selectedMonth == month) {
            days_element.classList.add('selected');
        }
        day_element.addEventListener('click', function () {
            selectedDate = new Date(year + '-' + (month + 1) + '-' + day_1);
            selectedDay = day_1;
            selectedMonth = month;
            selectedYear = year;
            selectedDayOfWeek = dayOfWeek;
            selected_date_element.textContent = formatDate(selectedDate);
            selected_date_element.dataset.value = selectedDate;
            populateDates();
        });
        days_element.appendChild(day_element);
        currentDate.setDate(currentDate.getDate() + 1);
    };
    // const weekDay_element = document.createElement('span');
    // weekDay_element.classList.add('day');
    // weekDay_element.textContent = weekDays;
    for (var i = 0; i < 42; i++) {
        _loop_1(i);
    }
}
function checkEventPathForClass(path, selector) {
    for (var i = 0; i < path.length; i++) {
        if (path[i].classList && path[i].classList.contains(selector)) {
            return true;
        }
    }
    return false;
}
function formatDate(d) {
    var day = d.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    var month = d.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    var year = d.getFullYear();
    return day + '.' + month + '.' + year;
}
window.addEventListener('keydown', function (e) {
    if (e.keyCode == 37) {
        goToPrevMonth(e);
    }
    if (e.keyCode == 39) {
        goToNextMonth(e);
    }
});
