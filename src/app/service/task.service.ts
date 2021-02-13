import {Injectable} from '@angular/core';
import {AppSettings} from "../app-settings";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Task} from "../objects/task";
import {FormSubmission} from "../objects/form-submission";

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    baseUrl = AppSettings.API_BASE_URL.concat('/task/');

    constructor(private http: HttpClient) {
    }

    getTaskById(taskId: string): Observable<Task> {
        return this.http.get(this.baseUrl.concat(taskId)).pipe(map((res: Task) => res));
    }

    submitForm(taskId: string, value: FormSubmission[]) {
        return this.http.post(this.baseUrl.concat('submit/').concat(taskId), value);
    }

}
