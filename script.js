let D1 = new Date(),
D1last = (D1.getFullYear(), D1.getMonth()+1,0).getDate(),
D1Nlast = new Date(D1.getFullYear(),D1.getMonth(),D1last).getDay(),
D1Nfirst = new Date(D1.getFullYear(),1).getDay(),
calendar = '<tr>',
month = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];

// < keycode 37
// > keycode 39