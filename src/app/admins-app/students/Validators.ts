import { AbstractControl } from '@angular/forms';

export function ValidateBirth(control: AbstractControl) {

    const inputDate = new Date(control.value)
    const todayDate = new Date (Date.now())
    var month = todayDate.getMonth() + 1;
    var day = todayDate.getDate();
    var year = todayDate.getFullYear() - 17;
    
    if (month < 10) {
       var newMonth = '0' + month.toString()
    }
    else {
       newMonth = month.toString()
    }
    if (day < 10) {
      var newDay = '0' + day.toString()
    }
    else {
      newDay = day.toString()
    }
  var minBirth = year + "-" + newMonth + "-" + newDay
  var minBirth1=new Date(minBirth)

  if (inputDate>minBirth1) {
    console.log(inputDate)
    console.log(minBirth1)
    return { invalidBirth: true };
  }
  return null;
}