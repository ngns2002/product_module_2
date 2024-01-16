// book detail ts 
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../books.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/cart/Cart.service';
import { HttpClient } from '@angular/common/http';
import { ICart } from 'src/app/cart/shared/models/cart-item';

@Component({
    selector: 'book-detail-app',
    templateUrl: 'book-detail.component.html',
    styleUrls: ['./book-detail.component.css']
})

export class bookdetailComponent implements OnInit {
    book: any = null;
    productList: any;
    quantity_oder: number = 1;

    constructor(private http: HttpClient, private api: ApiService, private route: ActivatedRoute, private CartAPI: CartService) { }

    ngOnInit(): void {
        const id = this.route.snapshot.params.get('id');
        if (id !== null) {
            this.api.getBookById(id).subscribe((res) => {
                console.log(res);
                this.book = res;
                this.productList = res;
                this.productList.forEach((a: any) => {
                    Object.assign(a, { quantity: 1, total: a.price });
                });
            })
        }
    }

    Addtocart(book: any) {
        const existingCartItem = this.CartAPI.findCartItemById(book.id);
        if (existingCartItem) {
            existingCartItem.quantity_oder = Number(existingCartItem.quantity_oder) + this.quantity_oder;
            this.CartAPI.UpdateCartItem(existingCartItem).subscribe((res) => {
                console.log(res);
                this.CartAPI.loadCartData();
            });
        } else {
            const bookToCart: ICart = {
                id: book.id,
                title: book.title,
                price: book.price,
                quantity: book.quantity.toString(),
                cover_image: book.cover_image,
                product_code: book.product_code,
                quantity_oder: this.quantity_oder,
                isuer: book.user,
            };
            this.CartAPI.Addproduct(bookToCart).subscribe((res) => {
                console.log(res);
                this.CartAPI.loadCartData();
            });
        }
    }
}
