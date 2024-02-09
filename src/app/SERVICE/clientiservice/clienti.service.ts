import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ClientiService {
    //url backend
    private backEndUrl = 'http://localhost:8080/clienti';

    //costruttore vuoto
    constructor(private http: HttpClient) {}

    //get
    getData(): Observable<any[]> {
        return this.http.get<any[]>(this.backEndUrl);
    }

    //getById
    getDataById(id: number): Observable<any[]> {
        return this.http.get<any[]>(this.backEndUrl + '/' + id);
    }

    //post
    postData(data: any[]): Observable<any> {
        return this.http.post(this.backEndUrl, data);
    }

    //put
    putData(data: any[], id: number): Observable<any> {
        return this.http.put(this.backEndUrl + '/' + id, data);
    }

    //delete
    deleteData(id: number): Observable<any> {
        return this.http.delete(this.backEndUrl + '/' + id);
    }
}
