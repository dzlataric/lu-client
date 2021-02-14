import {Component, OnInit} from '@angular/core';
import {RegistrationService} from "../../service/registration.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Task} from "../../objects/task";
import {FormField} from "../../objects/form-field";
import {FormSubmission} from "../../objects/form-submission";
import {NotificationService, NotificationType} from "../../service/notification.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ValidatorsService} from "../../service/validators.service";

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
                private validatorsService: ValidatorsService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.prepareRegistration(params.get('role'));
        });
        this.selectedGenres = [];
        this.formSubmission = [];
    }

    prepareRegistration(role: string) {
        this.registrationService.startProcess(role).subscribe(
            (task: Task) => {
                this.task = task;
                this.task.formFields.forEach((formField: FormField) => {
                    this.form.addControl(formField.id, new FormControl('', this.validatorsService.prepareValidators(formField)));
                })
            },
            err => {
                console.log('An error occurred: ' + err);
            });
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
