// cart component ts 
import { Component, OnInit } from '@angular/core';
import { CartService } from '../Cart.service';
import Swal from 'sweetalert2';
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

  emptycart() {
    this.APIcart.Removealdata();
    this.updateGrandTotal();
  }
  toggleSelection(item: any) {
    item.selected = !item.selected;
  }
  // add to check out 
  addToCheckout() {
    const itemsToAddToCheckout = this.product.filter((item: any) => item.selected);
    // if (itemsToAddToCheckout.length === 0) {
    //   const ToastWarning = Swal.mixin({
    //     toast: true,
    //     position: "top-end",
    //     showConfirmButton: false,
    //     timer: 3000,
    //     timerProgressBar: true,
    //     didOpen: (toast) => {
    //       toast.onmouseenter = Swal.stopTimer;
    //       toast.onmouseleave = Swal.resumeTimer;
    //     }
    //   });
    //   ToastWarning.fire({
    //     icon: "error",
    //     title: "Please choose a product"
    //   });
    // } else {
    //   const ToastSuccess = Swal.mixin({
    //     toast: true,
    //     position: "top-end",
    //     showConfirmButton: false,
    //     timer: 3000,
    //     timerProgressBar: true,
    //     didOpen: (toast) => {
    //       toast.onmouseenter = Swal.stopTimer;
    //       toast.onmouseleave = Swal.resumeTimer;
    //     }
    //   });
    //   ToastSuccess.fire({
    //     icon: "success",
    //     title: "add products to checkout successfully"
    //   });
    //   console.log("Sản phẩm order", itemsToAddToCheckout);
    //   this.APIcart.addToCheckout(itemsToAddToCheckout);
    this.router.navigate(['/checkout']);
  }
}
