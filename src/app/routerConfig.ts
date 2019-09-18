import {Routes} from '@angular/router';
import {SearchComponent} from './search/search.component';
import {AboutComponent} from './about/about.component';

const appRoutes: Routes = [
  { path: '',         component: SearchComponent },
  { path: 'about',    component: AboutComponent },
];

export default appRoutes;
