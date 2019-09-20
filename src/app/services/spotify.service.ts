import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private static ClientId = '57dcebec125f4dd69e55e1789587c379';
  private static AuthUrl = 'https://accounts.spotify.com/authorize';
  private static Scope = 'user-read-private user-read-email';

  private searchUrl: string;

  constructor(
    private http: HttpClient,
  ) {
  }

  login() {
    console.log('logging in');
    const state = this.generateRandomString(16);
    localStorage.removeItem('SpClassical-token');
    localStorage.setItem('SpClassical-state', state);
    const httpParams =
      new HttpParams()
        .set('client_id', SpotifyService.ClientId)
        .set('response_type', 'token')
        .set('redirect_uri', window.location.origin)
        .set('scope', SpotifyService.Scope)
        .set('state', state)
        // .set('show_dialog', 'true')
    ;

    const url = SpotifyService.AuthUrl + '?' + httpParams.toString();
    console.log('url: ' + url);
    window.location.replace(url);

    // this.http.get(this.AuthUrl, {params: httpParams}).subscribe(resp => {
    //   console.log(resp);
    // });
  }

  logout() {
    console.log('logging out XXX');
    // XXX
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('SpClassical-token') != null;
  }

  /**
   * Generates a random string containing numbers and letters
   */
  generateRandomString(length: number) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  searchMusic(str: string, type = 'artist') {
    this.searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(str)}&type=${encodeURIComponent(type)}`;
    console.log(this.searchUrl);
    return this.http.get(this.searchUrl);
  }
}
