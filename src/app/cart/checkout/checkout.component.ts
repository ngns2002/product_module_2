import { Component, OnInit } from '@angular/core';
import { CartService } from '../Cart.service';

@Component({
    selector: 'checkout-app',
    templateUrl: 'checkout.component.html',
    styleUrls: ['./checkout.component.css']
})

export class checkoutComponent implements OnInit {
    constructor(private APIcart: CartService) { }

    ngOnInit( ) { }
    
}