import {Component, OnInit} from '@angular/core';
import {MatRadioChange} from "@angular/material/radio";
import {Router} from "@angular/router";

@Component({
    selector: 'app-pre-registration',
    templateUrl: './pre-registration.component.html',
    styleUrls: ['./pre-registration.component.css']
})
export class PreRegistrationComponent implements OnInit {

    roleSelection: string[] = ['Writer', 'Reader'];
    selectedRole: string = null;

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    checkCheckBoxValue(event: MatRadioChange) {
        this.selectedRole = event.value;
    }

    confirmSelection() {
        let role = this.selectedRole === 'Writer' ? 'WRITER' : 'READER';
        this.router.navigate(["registration", role]);
    }

}
