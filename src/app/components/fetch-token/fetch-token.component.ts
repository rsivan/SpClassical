import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SpotifyService} from '../../services/spotify.service';

@Component({
  template: '',
})
export class FetchTokenComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() {
    this.route.fragment.subscribe( (fragment: string) => {
      const args = new URLSearchParams(fragment);
      this.spotifyService.updateToken(args);
      this.router.navigateByUrl('/search');
    });
  }

}
