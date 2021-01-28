import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettings} from "../app-settings";
import {Task} from "../objects/task";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  baseUrl = AppSettings.API_BASE_URL.concat('/registration/');

  constructor(private http: HttpClient) { }

  startProcess(): Observable<Task> {
    return this.http.get<Task>(this.baseUrl).pipe(map((res: Task) => res));
  }

  submitForm(taskId: string, value: any) {
    return this.http.post(this.baseUrl.concat(taskId), value);
  }

  verify(code: string) {
    return this.http.put(this.baseUrl.concat('verify/').concat(code), null);
  }
}
