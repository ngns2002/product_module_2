import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { checkoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';



const routes: Routes = [
    { path: 'checkout', component: checkoutComponent, canActivate: [AuthGuard] },
    { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class CartRoutingModule { }