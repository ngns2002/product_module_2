import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart/Cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class headerComponent implements OnInit {
  [x: string]: any;
  isLoggedIn = false;
  public totalItem : number = 0;
  constructor(private authService: AuthService, private APIcart: CartService) {}
  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
    this.APIcart.getproductdata()
    .subscribe((res: any[])=>{
      this.totalItem = res.length;
    })
  }

  logout(): void {
    localStorage.clear();
    localStorage.removeItem('saveUrl');
  }
}
