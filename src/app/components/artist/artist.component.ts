import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';
import {Album} from '../../models/album';
import {Artist} from '../../models/artist';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  id: string;
  artist: Artist;
  albums: Album[];

  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    if (!this.spotifyService.isLoggedIn()) {
      this.spotifyService.login();
    }
    this.route.params
      .subscribe(params => {
        this.spotifyService.getArtist(params.id)
          .subscribe(artist => {
            console.log('artist');
            console.log(artist);
            this.artist = artist;
            console.log('this.artist');
            console.log(this.artist);
          });
      });
  }

}
