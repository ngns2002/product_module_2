import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart/Cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  userRole: string = '';
  userName: string = ''; // Add this line
  res: any;
  public totalItem: number = 0;

  constructor(private authService: AuthService, private APIcart: CartService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      this.authService.userRole$.subscribe((role) => {
        this.userRole = role;
        this.getUserName(); // Add this line
      });
    });
    this.APIcart.getproductdata().subscribe((res: any[]) => {
      this.totalItem = res.length;
    });
  }

  logout(): void {
    localStorage.clear();
    localStorage.removeItem('saveUrl');
  }

  admin(): void {
    if (this.userRole === 'admin') {
      this.router.navigate(['/admin']);
    } else {
      console.log("You do not have permission to access admin.");
    }
  }

  getUserName(): void { // Add this method
    this.authService.getUsers().subscribe((res: any[]) => {
      const user = res.find((a: any) => a.role === this.userRole);
      if (user) {
        this.userName = user.name;
      }
    });
  }
}