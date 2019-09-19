import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchStr: string;
  search = new FormControl();

  constructor(private spotifyService: SpotifyService) {
  }

  ngOnInit() {
  }

  searchMusic() {
    this.searchStr = this.search.value;
    if (this.searchStr.trim().length > 0) {
      this.spotifyService.searchMusic(this.searchStr)
        .subscribe(res => {
          console.log(res);
        });
      console.log(this.searchStr);
    }
  }
}
