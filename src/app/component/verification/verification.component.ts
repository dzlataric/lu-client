import {Component, OnInit} from '@angular/core';
import {RegistrationService} from "../../service/registration.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {NotificationService, NotificationType} from "../../service/notification.service";

@Component({
    selector: 'app-verification',
    templateUrl: './verification.component.html',
    styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

    loading: boolean = false;

    constructor(
        private registrationService: RegistrationService,
        private notificationService: NotificationService,
        private activatedRoute: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit() {
        this.loading = true;
        this.activatedRoute.paramMap.subscribe(
            (params: ParamMap) => {
                this.registrationService.verify(params.get('code')).subscribe(() => {
                    this.notificationService.showNotification('Verification successful! You will be redirected in 5 seconds.', NotificationType.SUCCESS);
                    setTimeout(() => {
                            this.router.navigate(['/login']);
                            this.loading = false;
                        },
                        5000);
                }, error => {
                    this.router.navigate(['/']);
                    this.loading = false;
                })
            }, err => {
                this.router.navigate(['/']);
                this.loading = false;
            }
        )
    }

}
