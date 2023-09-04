import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ErrorDialogService } from '../error-dialog.service';

/**
 * HttpConfigInterceptor class override the HttpInterceptor class to include our customizations
 */
@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    constructor(public errorDialogService: ErrorDialogService) { }

    /**
     * intercept Function handling response returned from the server also cover headers part must be sent on all requests
     * @param request HTTP request called
     * @param next REST response to be handled
     * @returns Response
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = localStorage.getItem('token') as string;
        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }
        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }
        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        // TODO: - Remove for debug only
        console.log('request--->>>', request); 
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                // TODO: - Remove for debug only
                if (event instanceof HttpResponse) { 
                    console.log('event--->>>', event); 
                }
                return event;
            }),
            catchError((responseError: HttpErrorResponse) => {
                let data = {};
                let message = responseError.error['error']['message'];
                data = {
                    status: message ? 'Error' : responseError.status,
                    reason: message ? message : responseError.statusText,
                    statusCode: responseError.status
                };
                this.errorDialogService.openDialog(data);
                return throwError(responseError);
            }));
    }
}