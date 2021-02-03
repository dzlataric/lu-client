import {Component, OnInit} from '@angular/core';
import {RegistrationService} from "../../service/registration.service";
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {ValidationConstraint} from "../../objects/validation-constraint";
import {Task} from "../../objects/task";
import {FormField} from "../../objects/form-field";
import {FormSubmission} from "../../objects/form-submission";
import {NotificationService, NotificationType} from "../../service/notification.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

    form: FormGroup = new FormGroup({});
    task: Task | undefined;
    selectedGenres: any[] = [];
    formSubmission: FormSubmission[] = [];

    constructor(private registrationService: RegistrationService,
                private notificationService: NotificationService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.prepareRegistration();
        this.selectedGenres = [];
        this.formSubmission = [];
    }

    prepareRegistration() {
        this.registrationService.startProcess().subscribe(
            (task: Task) => {
                this.task = task;
                this.task.formFields.forEach((formField: FormField) => {
                    this.form.addControl(formField.id, new FormControl('', this.prepareValidators(formField)));
                })
            },
            err => {
                console.log('An error occurred: ' + err);
            });
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

    updateGenres(selected: any) {
        if (this.selectedGenres.includes(selected)) {
            let index = this.selectedGenres.indexOf(selected);
            this.selectedGenres.splice(index, 1);
        } else {
            this.selectedGenres.push(selected);
        }
    }

    submitForm() {
        Object.keys(this.form.value).forEach(
            key => {
                this.formSubmission.push({fieldId: key, value: this.form.value[key]});
            });
        this.registrationService.submitForm(this.task.id, this.formSubmission).subscribe(
            res => {
                this.notificationService.showNotification('Registered successfully!', NotificationType.SUCCESS);
                this.router.navigate(['/']);
            },
            err => {
                console.log(err);
                this.notificationService.showNotification(err, NotificationType.ERROR);
            }
        );
    }

}
