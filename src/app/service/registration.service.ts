import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettings} from "../app-settings";
import {Task} from "../objects/task";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {FormSubmission} from "../objects/form-submission";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  baseUrl = AppSettings.API_BASE_URL.concat('/user/registration/');

  constructor(private http: HttpClient) {
  }

  startProcess(role: string): Observable<Task> {
    return this.http.get<Task>(this.baseUrl.concat(role)).pipe(map((res: Task) => res));
  }

  submitForm(taskId: string, value: FormSubmission[]) {
    return this.http.post(this.baseUrl.concat(taskId), value);
  }

  verify(code: string) {
    return this.http.put(this.baseUrl.concat('verify/').concat(code), null);
  }
}
