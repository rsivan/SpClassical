import {RouterModule, Routes} from '@angular/router';
import {SearchComponent} from './search/search.component';
import {AboutComponent} from './about/about.component';
import {NgModule} from '@angular/core';

const appRoutes: Routes = [
  { path: '',         component: SearchComponent },
  { path: 'about',    component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
