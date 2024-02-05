import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  // lazy load module
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'book',
    loadChildren: () => import('./books/books.module').then(m => m.BookdModule)
  },
  {
    path: 'shop',
    loadChildren: () => import('./cart/cart.module').then(m => m.CheckoutModule)
  },
  {
    path: 'Admins',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
