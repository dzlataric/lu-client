import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

export enum NotificationType {
    SUCCESS,
    ERROR,
}

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private snackBar: MatSnackBar) {
    }

    showNotification(message: string, type: NotificationType) {
        this.snackBar.open(message, 'Clear', {
            duration: 2500,
            panelClass: [type == NotificationType.SUCCESS ? 'success-snackbar' : 'error-snackbar'],
            verticalPosition: 'top',
            horizontalPosition: 'end'
        });
    }
}
