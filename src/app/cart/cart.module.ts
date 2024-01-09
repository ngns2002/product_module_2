import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { checkoutComponent } from './checkout/checkout.component';
import { CartRoutingModule } from './cart-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    CartRoutingModule,
    FormsModule 
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
