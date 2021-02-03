import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {EventsService} from "./service/events.service";
import {AppSettings} from "./app-settings";
import {NotificationService, NotificationType} from "./service/notification.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'Literarno udruženje';
    name: string = '';
    role: string = '';

    constructor(private eventsService: EventsService,
                private notificationService: NotificationService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.eventsService.on(AppSettings.USER_LOGGED_IN_EVENT).subscribe(res => {
            this.name = res.username;
            this.role = '[' + res.role + ']';
        })
    }

    ngOnDestroy(): void {
        this.eventsService.unsubscribe(AppSettings.USER_LOGGED_IN_EVENT);
    }


    logout() {
        localStorage.removeItem('user');
        this.notificationService.showNotification(this.name + ' successfully logged out!', NotificationType.SUCCESS);
        this.router.navigate(['/']);
    }

    isLoggedIn(): boolean {
        return localStorage.getItem('user') !== null;
    }

}
