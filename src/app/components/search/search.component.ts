import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';
import {FormControl} from '@angular/forms';
import {Artist} from '../../models/artist';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  search = new FormControl();
  searchRes: Artist[];

  constructor(private spotifyService: SpotifyService) {
  }

  ngOnInit() {
  }

  searchMusic() {
    const searchStr = this.search.value;
    if (searchStr.trim().length > 0) {
      this.spotifyService.searchMusic(searchStr)
        .subscribe(res => {
          console.log(res);
          this.searchRes = res.artists.items;
        });
    }
  }
}
