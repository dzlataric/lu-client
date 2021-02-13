import {Injectable} from '@angular/core';
import {FormField} from "../objects/form-field";
import {ValidatorFn, Validators} from "@angular/forms";
import {ValidationConstraint} from "../objects/validation-constraint";

@Injectable({
    providedIn: 'root'
})
export class ValidatorsService {

    constructor() {
    }

    prepareValidators(field: FormField) {
        let validators: ValidatorFn[] = [];
        if (field.validationConstraints) {
            field.validationConstraints.forEach((constraint: ValidationConstraint) => {
                if (constraint.name === 'required') {
                    validators.push(Validators.required);
                }
                if (constraint.name === 'minlength') {
                    validators.push(Validators.minLength(constraint.configuration));
                }
                if (constraint.name === 'maxlength') {
                    validators.push(Validators.maxLength(constraint.configuration));
                }
                if (field.type.name === 'email') {
                    validators.push(Validators.email);
                }
            });
        }
        return validators;
    }
}
