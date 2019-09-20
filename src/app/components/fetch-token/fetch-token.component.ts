import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SpotifyService} from '../../services/spotify.service';

@Component({
  template: '',
})
export class FetchTokenComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() {
    this.route.fragment.subscribe( (fragment: string) => {
      console.log('route.fragment:');
      console.log(fragment);
      const args = new URLSearchParams(fragment);
      this.spotifyService.updateToken(args);
    });
  }

}
