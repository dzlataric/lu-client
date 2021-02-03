import {Component, OnInit} from '@angular/core';
import {Task} from 'src/app/objects/task';
import {UsersService} from "../../service/users.service";
import {NotificationService, NotificationType} from "../../service/notification.service";
import {User} from "../../objects/user";
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class ProfileComponent implements OnInit {

    tasks: Task[] = [];
    displayedColumns: string[] = ['assignee', 'id', 'name', 'processInstanceId', 'process', 'action'];
    expandedDisplayedColumns: string[] = ['name', 'value'];
    expandedElement: Task | null;
    expandedData: any[] = [
        {'name': 'prva', 'value': '1'},
        {'name': 'druga', 'value': '2'},
        {'name': 'treca', 'value': '3'}
    ]


    constructor(private usersService: UsersService,
                private notificationService: NotificationService) {
    }

    ngOnInit(): void {
        this.usersService.getActiveTasks(this.getUser().username).subscribe((res: Task[]) => {
            console.log(res);
            this.tasks = res;
        }, err => {
            this.notificationService.showNotification(err, NotificationType.ERROR);
        });
    }

    getUser(): User {
        return JSON.parse(localStorage.getItem('user'));
    }


}
