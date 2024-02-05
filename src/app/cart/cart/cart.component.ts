// cart component ts 
import { Component, OnInit } from '@angular/core';
import { CartService } from '../Cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cart-app',
  templateUrl: 'cart.component.html',
  styleUrls: ['./cart.Component.css'],
})
export class CartComponent implements OnInit {
  [x: string]: any;
  public product: any = [];
  public selectedItems: any[] = [];
  public grandTotal!: number;
  constructor(private APIcart: CartService, private router: Router) {}
  ngOnInit() {
    this.APIcart.getproductdata().subscribe((res) => {
      this.product = res;
      this.grandTotal = this.APIcart.getTotalPrice();
      this.grandTotalVND = this.formatAsVND(this.grandTotal);
    });
  }
  private formatAsVND(value: number): string {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0, // Số lượng số thập phân tối thiểu
    });

    return formatter.format(value);
  }
  removeItem(item: any) {
    this.APIcart.RemoveCart(item);
    this.updateGrandTotal();
  }

  // add to check out 
  addToCheckout() {
    this.router.navigate(['/checkout']);
  }
}
