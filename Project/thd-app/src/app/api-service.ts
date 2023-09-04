import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ENDPOINTS, API_BASE_URL } from './api-service-endpoints';

@Injectable({ providedIn: 'root' })
export class APIService {

    constructor(private http: HttpClient) { }

    isEnglish() {
        let currentLanguage = localStorage.getItem("selectedLanguge") as string;
        return currentLanguage == "en";
    }

    get<T>(endpoint: string) {
        let currentLanguage = localStorage.getItem("selectedLanguge") as string;
        var queryParams = { language: currentLanguage };
        return this.http.get<T>(this.getURL(endpoint), { params: queryParams }).pipe(
            map((response: T) => response)
        );
    }

    post<T>(endpoint: string, data?: Object) {
        return this.http.post<T>(this.getURL(endpoint), data).pipe(
            map((response: T) => response)
        );
    }

    put<T>(endpoint: string, data?: Object) {
        return this.http.put<T>(this.getURL(endpoint), data).pipe(
            map((response: T) => response)
        );
    }

    delete<T>(endpoint: string, data?: Object) {
        return this.http.delete<T>(this.getURL(endpoint), data).pipe(
            map((response: T) => response)
        );
    }

    getURL(endpoint: string) {
        return API_BASE_URL + endpoint;
    }
}