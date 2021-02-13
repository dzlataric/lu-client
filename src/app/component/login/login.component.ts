import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../service/users.service";
import {NotificationService, NotificationType} from "../../service/notification.service";
import {Router} from "@angular/router";
import {User} from "../../objects/user";
import {EventsService} from "../../service/events.service";
import {AppSettings} from "../../app-settings";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    form: FormGroup = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });

    constructor(private usersService: UsersService,
                private notificationService: NotificationService,
                private eventsService: EventsService,
                private router: Router) {
    }

    ngOnInit(): void {
        if (localStorage.getItem('user')) {
            this.router.navigate(['/']);
        }
    }

    submitForm() {
        this.usersService.login(this.form.value).subscribe((res: User) => {
            this.notificationService.showNotification(res.username + ' logged in successfully!', NotificationType.SUCCESS);
            localStorage.removeItem('user');
            localStorage.setItem('user', JSON.stringify(res));
            this.eventsService.publish(AppSettings.USER_LOGGED_IN_EVENT, res);
            this.router.navigate(['/profile']);
        }, err => {
            console.log(err);
            this.notificationService.showNotification('Login failed! Check if user is verified or data entered is valid.', NotificationType.ERROR);
        });
    }
}
