const date_picker_element = document.querySelector('.date-picker');
const selected_date_element = document.querySelector('.date-picker .selected-date');
const dates_element = document.querySelector('.date-picker .dates');
const mth_element = document.querySelector('.date-picker .dates .month .mth');
const next_mth_element = document.querySelector('.date-picker .dates .month .next-mth');
const prev_mth_element = document.querySelector('.date-picker .dates .month .prev-mth');
const days_element = document.querySelector('.date-picker .dates .days');

const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

date_picker_element.addEventListener('click', toggleDatePicker);

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

let monthAndYear = document.getElementsByClassName('dates');

mth_element.textContent = months[month] + ' ' + year;

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
  daysInMonth(month, year);
}

function goToPrevMonth(e) {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  mth_element.textContent = months[month] + ' ' + year;
  daysInMonth(month, year);
}



// console.log(daysInMonth(2, 2019));
// console.log(daysInMonth(2, 2020));

// daysInMonth(7, 2019);
// daysInMonth(2, 2019);
// daysInMonth(2, 2020);

function populateDates (e) {
  days_element.innerHTML = '';
  const amount_days = daysInMonth();

  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
 }

  for (let i = 0; i < amount_days; i++) {
    const day_element = document.createElement('div');
    day_element.classList.add('day');
    day_element.textContent = i + 1;
    
    if (selectedDay == (i + 1) && selectedYear == year && selectedMonth == month) {
      days_element.classList.add('selected');
    }

    day_element.addEventListener('click', function () {
        selectedDate = new Date(year + '-' + (month +  1) + '-' + (i + 1));
        selectedDay = (i + 1);
        selectedMonth = month;
        selectedYear = year;
        selected_date_element.textContent = formatDate(selectedDate);
        selected_date_element.dataset.value = selectedDate;
        populateDates();
    });

    days_element.appendChild(day_element);
  }
}

function checkEventPathForClass(path, selector) {
  for (let i = 0; i < path.length; i++) {
      if (path[i].classList && path[i].classList.contains(selector)) {
        return true;
      }
  }

  return false;
}

function formatDate(d) {
  let day = d.getDate();
  if (day < 10) {
    day = '0' + day;
  }
  let month = d.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }
  let year = d.getFullYear();
  return day + '.' + month + '.' + year;
}

window.addEventListener('keydown', function (e) {
  if (e.keyCode == 37) {
    goToPrevMonth (e);
  }
  if (e.keyCode == 39) {
    goToNextMonth (e);
  }
});
