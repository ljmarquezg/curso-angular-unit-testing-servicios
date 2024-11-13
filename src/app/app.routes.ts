import { Routes } from '@angular/router';
import { OthersComponent } from './components/others/others.component';
import { PeopleComponent } from './components/people/people.component';
import { PersonComponent } from './components/person/person.component';
import { PicoPreviewComponent } from './components/pico-preview/pico-preview.component';
import { ProductsComponent } from './components/products/products.component';

export const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'pico-preview',
    component: PicoPreviewComponent
  },
  {
    path: 'people',
    component: PeopleComponent
  },
  {
    path: 'others',
    component: OthersComponent
  }
];
