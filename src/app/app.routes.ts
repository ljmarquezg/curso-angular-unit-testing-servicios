import { Routes } from '@angular/router';
import { LoginFormComponent } from './components/auth/components/login-form/login-form.component';
import { RegisterFormComponent } from './components/auth/components/register-form/register-form.component';
import { OthersComponent } from './components/others/others.component';
import { PeopleComponent } from './components/people/people.component';
import { PicoPreviewComponent } from './components/pico-preview/pico-preview.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
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
  },
  {
    path: 'login',
    component: LoginFormComponent
  },
  {
    path: 'register',
    component: RegisterFormComponent
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent
  }
];
