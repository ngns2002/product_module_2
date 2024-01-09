import { Component, OnInit } from '@angular/core';
import { ApiService } from '../books.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/cart/Cart.service';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
    selector: 'book-detail-app',
    templateUrl: 'book-detail.component.html',
    styleUrls: ['./book-detail.component.css']
})

export class bookdetailComponent implements OnInit {
    book: any = null;
    productList: any;
    quantity_oder: number = 1;

    constructor(private api: ApiService, private route: ActivatedRoute, private CartAPI: CartService) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
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
        book.quantity_oder = this.quantity_oder; 
        this.CartAPI.Addtocart(book);
    }
}
