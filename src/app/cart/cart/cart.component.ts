// cart component ts 
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
  public grandTotal!: number;
  constructor(private APIcart: CartService) {}
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

  emptycart() {
    this.APIcart.Removealldata();
    this.updateGrandTotal();
  }
}
