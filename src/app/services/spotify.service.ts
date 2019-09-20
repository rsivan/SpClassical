import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  static AuthStateKey = 'SpClassical-state';

  private static ClientId = '57dcebec125f4dd69e55e1789587c379';
  private static AuthUrl = 'https://accounts.spotify.com/authorize';
  private static Scope = 'user-read-private user-read-email';

  private state: string = null;
  private accessToken: string = null;

  private searchUrl: string = null;

  /**
   * Generates a random string containing numbers and letters
   */
  static generateRandomString(length: number) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  constructor(
    private http: HttpClient,
  ) {
    // state is rebuilt from local storage on page reload
    this.state = localStorage.getItem(SpotifyService.AuthStateKey);
  }

  // noinspection JSMethodCanBeStatic
  login(): void {
    console.log('logging in');
    const state = SpotifyService.generateRandomString(16);
    localStorage.setItem(SpotifyService.AuthStateKey, state);
    const httpParams =
      new HttpParams()
        .set('client_id', SpotifyService.ClientId)
        .set('response_type', 'token')
        .set('redirect_uri', window.location.origin + '/fetch-token')
        .set('scope', SpotifyService.Scope)
        .set('state', state)
        // .set('show_dialog', 'true')
    ;

    const url = SpotifyService.AuthUrl + '?' + httpParams.toString();
    console.log('url: ' + url);
    window.location.replace(url);
  }

  logout() {
    console.log('logging out XXX');
    this.state = null;
    this.accessToken = null;
  }

  isLoggedIn(): boolean {
    return this.accessToken != null;
  }

  searchMusic(str: string, type = 'artist') {
    this.searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(str)}&type=${encodeURIComponent(type)}`;
    // this.searchUrl = `https://api.spotify.com/v1/search#access_token=${encodeURIComponent(this.accessToken)}` +
    //   `&token_type=Bearer&expires_in=3600&state=${this.state}?q=${encodeURIComponent(str)}&type=${encodeURIComponent(type)}`;
    console.log(this.searchUrl);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.accessToken
      })
    };
    return this.http.get(this.searchUrl, httpOptions);
  }

  updateToken(args: URLSearchParams) {
    const accessToken = args.get('access_token');
    const state = args.get('state');
    if (state == null || this.state == null || state !== this.state) {
      console.log(`ignoring bad token: expected state=${this.state}, got state=${state}`);
    } else if (accessToken == null) {
      console.log(`ignoring null token`);
    } else {
      this.accessToken = accessToken;
    }
  }
}
