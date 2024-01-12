import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICart } from 'src/app/cart/shared/models/cart-item';

@Injectable({ providedIn: 'root' })
export class CartService {
  Cartdata: any[] = [];
  productlist = new BehaviorSubject<any>([]);
  private data = 'http://localhost:3000/cart';
  
  constructor(private http: HttpClient) {
    this.loadCartData();
  }
  findCartItemById(productId: string): any {
    return this.Cartdata.find((item) => item.id === productId);
  }

  loadCartData() {
    this.http.get<any[]>(this.data).subscribe((res) => {
      this.Cartdata = res;
      this.productlist.next(this.Cartdata);
    });
  }
  // get product data
  getproductdata() {
    return this.productlist.asObservable();
  }
  // set product data
  setproductdata(product: any) {
    this.Cartdata.push(...product);
    this.productlist.next(product);
  }
  // api
  Addproduct(cart: ICart): Observable<ICart[]> {
    return this.http.post<ICart[]>(this.data, cart);
  }

  // add to cart detail
  Addtocart(product: any) {
    this.Cartdata.push(product);
    this.productlist.next(this.Cartdata);
    this.getTotalPrice();
    console.log('Cartdata:', this.Cartdata);
  }
  getTotalPrice(): number {
    let grandTotal = 0;
    this.Cartdata.forEach((item: any) => {
      // console.log("Item:", item);
      const price = parseFloat(item.price.replace('.', '').replace(',', '.'));
      grandTotal += price * item.quantity_oder;
    });
    // console.log("Tổng giá trị:", grandTotal);
    return grandTotal;
  }
  // remove product from cart and db.json
  RemoveCart(product: any) {
    this.http.delete(`${this.data}/${product.id}`).subscribe((res) => {
      this.Cartdata.map((a: any, index: any) => {
        if (product.id === a.id) {
          this.Cartdata.splice(index, 1);
        }
      });
      this.productlist.next(this.Cartdata);
    });
  }
  // remove all data to cart
  Removealldata() {
    this.Cartdata = [];
    this.productlist.next(this.Cartdata);
  }
}
