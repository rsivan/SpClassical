import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SpotifyService} from './spotify.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthService  implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem(SpotifyService.AuthTokenKey);
    if (accessToken && req.url.match(/api.spotify.com/)) {
      req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + accessToken)});
    }
    return next.handle(req);
  }

}
