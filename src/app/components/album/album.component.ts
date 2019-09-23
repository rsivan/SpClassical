import { Component, OnInit } from '@angular/core';
import {Album} from '../../models/album';
import {SpotifyService} from '../../services/spotify.service';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  id: string;
  album: Album;

  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (!this.spotifyService.isLoggedIn()) {
      this.spotifyService.login();
    }
    this.route.params
      .pipe(
        map(params => params.id)
      )
      .subscribe(albumId => {
        this.spotifyService.getAlbum(albumId)
          .subscribe(album => {
            this.album = album;
          });
      });
  }

}
