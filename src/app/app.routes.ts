import { Routes } from '@angular/router';
import { Register } from './components/register/register';
import { Search } from './components/search/search';
import { Update } from './components/update/update';

export const routes: Routes = [
  { path: '', component: Register },
  { path: 'search', component: Search },
  { path: 'update/:id', component: Update },
];
