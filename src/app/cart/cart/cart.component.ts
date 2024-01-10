import { Component, OnInit } from '@angular/core';
import { CartService } from '../Cart.service';

@Component({
  selector: 'cart-app',
  templateUrl: 'cart.component.html',
  styleUrls: ['./cart.Component.css'],
})
export class CartComponent implements OnInit {
  [x: string]: any;
  public product: any = [];
  grandTotal: number = 0;
  quantityToUpdate: number = 1;
  constructor(private APIcart: CartService) {}
  ngOnInit() {
    this.APIcart.getproductdata().subscribe((res) => {
      this.product = res;
      this.updateGrandTotal();
    });
  }
  
  updateGrandTotal() {
    this.grandTotal = this.APIcart.calculateGrandTotal(); 
  }

  removeItem(item: any) {
    this.APIcart.RemoveCart(item);
    this.updateGrandTotal(); 
  }

  emptycart() {
    this.APIcart.Removealldata();
    this.updateGrandTotal();
  }
}