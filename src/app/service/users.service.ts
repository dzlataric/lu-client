import {Injectable} from '@angular/core';
import {AppSettings} from "../app-settings";
import {HttpClient} from "@angular/common/http";
import {User} from "../objects/user";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Task} from "../objects/task";

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    baseUrl = AppSettings.API_BASE_URL.concat('/user/');

    constructor(private http: HttpClient) {
    }

    login(loginData: User): Observable<User> {
        return this.http.post(this.baseUrl.concat('login'), loginData).pipe(map((res: User) => res));
    }

    getActiveTasks(username: string): Observable<Task[]> {
        return this.http.get(this.baseUrl.concat(username)).pipe(map((res: Task[]) => res));
    }
}
