import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {map} from "rxjs/operators";
import {AppSettings} from "../app-settings";

@Injectable({
    providedIn: 'root'
})
export class TextService {

    baseUrl = AppSettings.API_BASE_URL.concat('/text/');

    constructor(private http: HttpClient) {
    }

    upload(fileToUpload: File, processInstanceId: string, userId: number, addMore: boolean): Observable<boolean> {
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        return this.http
            .post(this.baseUrl +  'upload/' + userId + '/' + processInstanceId + '/' + addMore, formData)
            .pipe(map(() => true));
    }

    get(url: string): Observable<HttpResponse<Blob>> {
        return this.http.get<Blob>(url, {
            responseType: 'blob' as 'json',
            observe: 'response'
        });
    }
}
