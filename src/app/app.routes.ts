import { Routes } from '@angular/router';
import { Register } from './components/register/register';
import { Search } from './components/search/search';

export const routes: Routes = [
  { path: '', component: Register },
  { path: 'search', component: Search },
];
