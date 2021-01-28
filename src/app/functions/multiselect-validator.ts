import {AbstractControl, ValidatorFn} from "@angular/forms";

export function multiselectValidator(min: any): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    console.log('Min to select: '+ min);
    console.log(control.value);
    var randomBoolean = Math.random() < 0.5;
    return randomBoolean ? {minSelect: true} : null;
  };
}
