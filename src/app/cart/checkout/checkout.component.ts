import { Component, OnInit } from '@angular/core';
import { CartService } from '../Cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ICheck } from '../shared/models/checkout';

@Component({
  selector: 'checkout-app',
  templateUrl: 'checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class checkoutComponent implements OnInit {
  public product: any = [];
  public checkoutForm!: FormGroup;
  constructor(
    private APIcart: CartService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.APIcart.getproductdata().subscribe((res) => {
      this.product = res;
      this.checkoutForm = this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        address: ['', [Validators.required]],
      });
    });
  }
  removeItem(item: any) {
    this.APIcart.RemoveCart(item);
  }
  emptycart() {
    this.APIcart.Removealdata();
  }
  buynow() {
    if (this.checkoutForm.valid) {
      const checkoutItems: ICheck[] = this.product.map(
        (item: {
          id: number;
          title: string;
          price: number;
          quantity: number;
          cover_image: string;
          product_code: string;
          quantity_oder: number;
        }) => {
          return {
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            cover_image: item.cover_image,
            product_code: item.product_code,
            quantity_oder: item.quantity_oder,
            DataUser: {
              firstName: this.checkoutForm.value.firstName,
              lastName: this.checkoutForm.value.lastName,
              phone: this.checkoutForm.value.phone,
              address: this.checkoutForm.value.address,
            },
          };
        }
      );
      checkoutItems.forEach(item => {
        this.removeItem(item);
      }) 
      this.http.post('http://localhost:3000/checkout', checkoutItems).subscribe(
        (response) => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: 'success',
            title: 'Order placed successfully',
          });
          console.log(checkoutItems);
          
        },
        (error) => {
          // Handle errors
          console.error('Error during checkout:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  
}
