import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const encryptedAuthToken = localStorage.getItem('authToken',);
    if (encryptedAuthToken) {
      const bytes = CryptoJS.AES.decrypt(encryptedAuthToken, 'UbuntuHaha');
      const authToken = bytes.toString(CryptoJS.enc.Utf8);
      if (authToken) {
        return true;
      }
    }
    localStorage.setItem('saveUrl', state.url);
    this.router.navigate(['/login']);
    return false;
  }
}