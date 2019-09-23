import { Component, OnInit } from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() {
  }

  isLoggedIn() {
    return this.spotifyService.isLoggedIn();
  }

  login() {
    this.spotifyService.login();
  }

  logout() {
    this.spotifyService.logout();
  }
}
