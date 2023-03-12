import { AbstractControl } from '@angular/forms';

export function ValidateDate(control: AbstractControl) {
    const date1 = new Date(control.value)
    const day = date1.getDay()
  if (day!=0) {
    return { invalidDate: true };
  }
  return null;
}