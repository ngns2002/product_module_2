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
  //   Thêm sản phẩm vào mảng Cartdata: Dòng this.Cartdata.push(...product); sử dụng toán tử spread (...) 
//   để thêm các phần tử từ mảng product vào mảng Cartdata. Nếu product là một đối tượng (không phải mảng), 
//   thì nó sẽ được thêm vào Cartdata như một phần tử mới.
// Cập nhật BehaviorSubject: Dòng this.productlist.next(product); 
// gọi phương thức next trên BehaviorSubject productlist, 
// cung cấp product làm giá trị tiếp theo12. Điều này có nghĩa là bất kỳ người đăng ký (subscriber) 
// nào của productlist sẽ nhận được product như là giá trị tiếp theo.
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
      const price = parseFloat(item.price.replace('.', '').replace(',', '.'));
      grandTotal += price * item.quantity_oder;
    });
    return grandTotal;
  }
  // remove product from cart and db.json
  RemoveCart(product: any) {
    this.http.delete(`${this.data}/${product.id}`).subscribe((res) => { //Template Literal cho phép bạn nhúng các biến hoặc biểu thức vào trong một chuỗi
      this.Cartdata.map((a: any, index: any) => {
        if (product.id === a.id) {
          this.Cartdata.splice(index, 1);
        }
      });
      this.productlist.next(this.Cartdata);
    });
  }
  
  // remove all data to cart
  Removealdata() {
    this.Cartdata = [];
    this.productlist.next(this.Cartdata);
  }
  // update data when add
  UpdateCartItem(cartItem: ICart): Observable<ICart> {
    const url = `${this.data}/${cartItem.id}`;
    return this.http.put<ICart>(url, cartItem);
  }
  // add to checkout 
  addToCheckout(product :any){
    this.Cartdata.push(product);
    this.productlist.next(this.Cartdata);
    this.getTotalPrice();
    console.log('Cartdata:', this.Cartdata);
  }
}