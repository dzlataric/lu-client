import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Task} from 'src/app/objects/task';
import {TaskService} from "../../service/task.service";
import {FormControl, FormGroup} from "@angular/forms";
import {FormField} from "../../objects/form-field";
import {ValidatorsService} from "../../service/validators.service";
import {TextService} from "../../service/text.service";
import {NotificationService, NotificationType} from "../../service/notification.service";
import {UsersService} from "../../service/users.service";
import {FormSubmission} from "../../objects/form-submission";
import {User} from "../../objects/user";

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

    form: FormGroup = new FormGroup({});
    task: Task | null;
    fileToUpload: File = null;
    fileUploadNeeded: boolean = false;
    loading: boolean = false;
    formSubmission: FormSubmission[] = [];

    constructor(private activatedRoute: ActivatedRoute,
                private validatorsService: ValidatorsService,
                private taskService: TaskService,
                private textService: TextService,
                private notificationService: NotificationService,
                private usersSevice: UsersService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
            let taskId = params.get('taskId');
            this.taskService.getTaskById(taskId).subscribe((res: Task) => {
                this.task = res;
                this.task.formFields.forEach((formField: FormField) => {
                    if (formField.type.name === 'boolean') {
                        this.form.addControl(formField.id, new FormControl('false', this.validatorsService.prepareValidators(formField)));
                    } else {
                        this.form.addControl(formField.id, new FormControl('', this.validatorsService.prepareValidators(formField)));
                    }
                })
                if(this.form.value.hasOwnProperty('file'))  {
                    this.fileUploadNeeded = true;
                }
            }, err => {
                console.log(err);
            })
        });
    }

    submitForm(task: Task) {
        this.loading = true;
        let addMore: boolean = false;
        Object.keys(this.form.value).forEach(
            key => {
                addMore = key === 'addMore' ? this.form.value[key] : false;
                this.formSubmission.push({fieldId: key, value: key === 'file' ? this.fileToUpload.name : this.form.value[key]});
            });
        if (this.form.value.hasOwnProperty('file')) {
            this.upload(task, this.usersSevice.getUser(), addMore);
        } else {
            this.submit(task);
        }
    }

    upload(task: Task, user: User, addMore: boolean) {
        this.textService.upload(this.fileToUpload, task.processInstanceId, user.id, addMore).subscribe(() => {
            this.notificationService.showNotification('File upload is successful!', NotificationType.SUCCESS);
            this.submit(task);
        }, err => {
            console.log(err);
            this.notificationService.showNotification('File upload error!', NotificationType.ERROR);
            this.loading = false;
        });
    }

    private submit(task: Task) {
        this.taskService.submitForm(task.id, this.formSubmission).subscribe(() => {
            this.notificationService.showNotification('Form submission successful!', NotificationType.SUCCESS);
            this.loading = false;
            this.router.navigate(['/profile']);
        }, err => {
            this.notificationService.showNotification('Form submission error!', NotificationType.ERROR);
            console.log('Task form submission error: ' + err)
            this.loading = false;
        })
    }

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
    }

}
