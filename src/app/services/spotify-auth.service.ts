import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {SpotifyService} from './spotify.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthService  implements HttpInterceptor {

  constructor(
    private spotifyService: SpotifyService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem(SpotifyService.AuthTokenKey);
    if (accessToken && req.url.match(/api.spotify.com/)) {
      req = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + accessToken)});
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
          if (error && error.status === 401) {
            this.spotifyService.login();
          } else {
            return throwError(error);
          }
        }
      ));
  }
}
