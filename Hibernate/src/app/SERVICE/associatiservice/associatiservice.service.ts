import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AssociatiserviceService {
    private backEndUrl = 'http://localhost:8080/associati';

    constructor(private http: HttpClient) {}

    //get?
    getData(): Observable<any[]> {
        return this.http.get<any[]>(this.backEndUrl);
    }

    //post
    postData(data: any): Observable<any> {
        return this.http.post(this.backEndUrl, data);
    }

    //put
    putData(data: any, pos: number): Observable<any> {
        return this.http.put(this.backEndUrl + '/' + pos, data);
    }

    //delete
    deleteData(pos: number): Observable<any> {
        return this.http.delete(this.backEndUrl + '/' + pos);
    }
}
