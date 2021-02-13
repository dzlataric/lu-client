import {Component, OnInit} from '@angular/core';
import {Task} from 'src/app/objects/task';
import {UsersService} from "../../service/users.service";
import {NotificationService, NotificationType} from "../../service/notification.service";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Router} from "@angular/router";
import {User} from "../../objects/user";

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
    expandedData: Map<string, any> | null;

    constructor(private usersService: UsersService,
                private notificationService: NotificationService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.usersService.getActiveTasks(this.usersService.getUser().username).subscribe((res: Task[]) => {
            console.log(res);
            this.tasks = res;
        }, err => {
            this.notificationService.showNotification(err, NotificationType.ERROR);
        });
    }


    log(task: Task) {
        this.expandedData = task.variables;
    }

    executeTask(taskId: string) {
        this.router.navigate(["task", taskId]);
    }

    getUser(): User {
        return this.usersService.getUser();
    }
}
