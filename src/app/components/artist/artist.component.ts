import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';
import {Album} from '../../models/album';
import {Artist} from '../../models/artist';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';

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
      .pipe(
        map(params => params.id)
      )
      .subscribe(artistId => {
        this.spotifyService.getArtist(artistId)
          .subscribe(artist => {
            this.artist = artist;
          });
        this.spotifyService.getAlbums(artistId)
          .subscribe(albums => {
            this.albums = albums.items;
          });
      });
  }

}
