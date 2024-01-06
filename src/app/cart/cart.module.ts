import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { checkoutComponent } from './checkout/checkout.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [
    CartComponent,
    checkoutComponent
  ],
  declarations: [
    CartComponent,
    checkoutComponent
    
  ],
  providers: [],
})
export class CheckoutModule {}