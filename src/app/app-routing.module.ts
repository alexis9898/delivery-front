import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: 'products', loadChildren: () => import('./components/products/products.module').then(m => m.ProductsModule)},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'customers', loadChildren: () => import('./components/customers/customers.module').then(m => m.CustomerssModule)},
  {path: 'delivery-manage', loadChildren: () => import('./components/manage-delivery/manage-delivery.module').then(m => m.ProductsModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
