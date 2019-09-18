import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SearchComponent} from './components/search/search.component';
import {AboutComponent} from './components/about/about.component';

const appRoutes: Routes = [
  { path: '',         component: SearchComponent },
  { path: 'about',    component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
