const date_picker_element = document.querySelector('.date-picker');
const selected_date_element = document.querySelector('.date-picker .selected-date');
const dates_element = document.querySelector('.date-picker .dates');
const mth_element = document.querySelector('date-picker .dates .month .mth');
const next_mth_element = document.querySelector('date-picker .dates .month .next-mth');
const prev_mth_element = document.querySelector('date-picker .dates .month .prev-mth');
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

mth_element.textContent = months[month];

function toggleDatePicker(e) {
  if (!checkEventPathForClass(e.path, 'dates')) {
    dates_element.classList.toggle('active');
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
// < keycode 37
// > keycode 39