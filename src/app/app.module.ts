import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatToolbarModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NavbarComponent} from './components/navbar/navbar.component';
import {AboutComponent} from './components/about/about.component';
import {SearchComponent} from './components/search/search.component';
import {SpotifyService} from './services/spotify.service';
import {HttpClientModule} from '@angular/common/http';
import { FetchTokenComponent } from './components/fetch-token/fetch-token.component';
import { ArtistComponent } from './components/artist/artist.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    SearchComponent,
    FetchTokenComponent,
    ArtistComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
  ],
  providers: [SpotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
