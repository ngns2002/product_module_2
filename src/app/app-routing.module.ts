import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { booklistComponent } from './books/book-list/book-list.component';
import { CartComponent } from './cart/cart/cart.component';
import { checkoutComponent } from './cart/checkout/checkout.component';
import { bookdetailComponent } from './books/book-detail/book-detail.component';
import { AuthGuard } from './auth/auth.guard';
// import { loginComponent } from './auth/login/login.component';
// import { RegisterComponent } from './auth/register/register.component';
const routes: Routes = [
  // lazy load module
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  { path: '', component: booklistComponent},
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: checkoutComponent, canActivate: [AuthGuard] },
  { path: 'detail/:id', component: bookdetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
