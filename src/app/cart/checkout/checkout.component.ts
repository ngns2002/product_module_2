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
      // Check if the cart is empty
      if (this.product.length === 0) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          iconColor: 'white',
          customClass: {
            popup: 'colored-toast',
          },
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        (async () => {
          await Toast.fire({
            icon: 'error',
            title: 'Giỏ hàng không có sản phẩm',
          });
        })();
      } else{
      const checkoutItems: ICheck[] = this.product.map((item: any) => {
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
      });
  
      // Remove items from the cart
      checkoutItems.forEach(item => {
        this.removeItem(item);
      });
  
      // Make the HTTP request
      this.http.post('http://localhost:3000/checkout', checkoutItems).subscribe(
        (response) => {
          console.log('Server response:', response);
          Swal.fire({
            title: "Oder success!",
            text: "You clicked the button!",
            icon: "success"
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = '/';
            }
          });
        },
        (error) => {
          // Handle errors
          console.error('Error during checkout:', error);
        }
      )};
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        iconColor: 'white',
        customClass: {
          popup: 'colored-toast',
        },
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
      
      ;(async () => {
        await Toast.fire({
          icon: 'error',
          title: 'Vui lòng điền đầy đủ thông tin',
        })
      })()
    }
  }
}  