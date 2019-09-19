import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthConfig, JwksValidationHandler, OAuthService} from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private searchUrl: string;
  private SpotifyClientId = '57dcebec125f4dd69e55e1789587c379';

  private loginToken: object = null;

  private authConfig: AuthConfig = {

    // Url of the Identity Provider
    issuer: 'https://accounts.spotify.com/authorize',

    // URL of the SPA to redirect the user to after login
    redirectUri: window.location.origin + '/',

    // The SPA's id. The SPA is registered with this id at the auth-server
    clientId: this.SpotifyClientId,

    // set the scope for the permissions the client should request
    // The first three are defined by OIDC. The 4th is a usecase-specific one
    scope: 'user-read-private user-read-email',
  };

  constructor(
    private http: HttpClient,
    private oauthService: OAuthService
  ) {
    this.configureAuthentication();
  }

  private configureAuthentication() {
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login() {
    console.log('logging in');
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  isLoggedIn(): boolean {
    return this.loginToken != null;
  }

  searchMusic(str: string, type = 'artist') {
    this.searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(str)}&type=${encodeURIComponent(type)}`;
    console.log(this.searchUrl);
    return this.http.get(this.searchUrl);
  }
}
