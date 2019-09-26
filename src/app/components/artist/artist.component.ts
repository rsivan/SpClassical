import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';
import {Artist} from '../../models/artist';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  id: string;
  artist: Artist;
  albums = [];

  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map(params => params.get('id'))
      )
      .subscribe(artistId => {
        this.spotifyService.getArtist(artistId)
          .subscribe(artist => {
            this.artist = artist;
          });
        this.spotifyService.getAlbums(artistId)
          .subscribe(albums => {
            this.albums.push(...albums.items);
            if (albums.next) {
              this.getMoreAlbums(albums.next);
            }
          });
      });
  }

  // recursive
  private getMoreAlbums(nextUrl: string) {
    this.spotifyService.getAlbumsNext(nextUrl)
      .subscribe(albums => {
        this.albums.push(...albums.items);
        if (albums.next) {
          this.getMoreAlbums(albums.next);
        }
      });
  }
}
