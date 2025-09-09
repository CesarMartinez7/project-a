import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { CarritoComponent } from './pages/carrito/carrito.component';

// SI EN UN FUTURO ALGUIEN TOCA ESTE CODIGO, MUY POCO PROBABLE, ENTONCES TENER LAS MEJORES PRACTICAS, ESTOY PROYECTO ES UNA MRD

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',

    component: LoginComponent,
  },
  {
    path: 'registro',
    component: RegisterComponent,
  },
  {
    path: 'productos',
    component: ProductosComponent,
  },
  {
    path: 'shopping',
    component: CarritoComponent,
  },
  { path: '**', redirectTo: 'login' },
];
