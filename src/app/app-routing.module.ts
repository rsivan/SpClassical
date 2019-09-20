import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SearchComponent} from './components/search/search.component';
import {AboutComponent} from './components/about/about.component';
import {FetchTokenComponent} from './components/fetch-token/fetch-token.component';

const appRoutes: Routes = [
  { path: '',             component: SearchComponent },
  { path: 'about',        component: AboutComponent },
  { path: 'fetch-token',  component: FetchTokenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
