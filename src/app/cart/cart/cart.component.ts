import { Component, OnInit } from '@angular/core';
import { CartService } from '../Cart.service';

@Component({
    selector: 'cart-app',
    templateUrl: 'cart.component.html',
    styleUrls: ['./cart.Component.css']
})

export class CartComponent implements OnInit {
[x: string]: any;
    public product : any = [];
    public grandTotal: number = 0;
    quantityToUpdate: number = 1;
    constructor(private APIcart:CartService) { }
    increaseQuantity() {
        this.quantityToUpdate += 1;
    }

    ngOnInit() { 
    this.APIcart.getproductdata()
    .subscribe(res=>{
      this.product = res;
      this.grandTotal = this.APIcart.GetTotalAmout();
    })
  }
  
  removeItem(item: any){
    this.APIcart.RemoveCart(item);
  }
  emptycart(){
    this.APIcart.Removealldata();
  }
    }