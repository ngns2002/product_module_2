import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { AuthService } from '../auth.service';
import { IUser } from '../shared/models/user';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class loginComponent implements OnInit {
  [x: string]: any;
  userRole: string = '';

    loginFrom!: FormGroup;
    constructor(
      private formBuilder: FormBuilder, private _http:HttpClient, private router:Router,  private authService: AuthService ) {}
   ngOnInit(): void {
    this.loginFrom = this.formBuilder.group({
      user: ['', [Validators.required, Validators.minLength(3),
      Validators.maxLength(20), Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      pass: ['', [Validators.required, Validators.minLength(8), 
      Validators.maxLength(32), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/)]],
    });
    
  }
    logincup(){

      if (this.loginFrom.invalid) {
        let errorMessage = 'Oh no! There seems to be an error with your input:';
        const formControls = this.loginFrom.controls;
        if (formControls.user.errors) {
          errorMessage += '\n User: illegal';
        }
        if (formControls.pass.errors) {
          errorMessage += '\n Password: illegal';
        }
    
        Swal.fire({
          icon: "error",
          title: errorMessage,
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
          }
        });
      } else {
  this.authService.getUsers().subscribe((res: IUser[]) => {
    
    const user = res.find((a:IUser) => {
      return a.user === this.loginFrom.value.user && a.pass === this.loginFrom.value.pass 
    });

    if (user) {
      this.userRole = user.role;
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Login success"
      });
      this.authService.login(this.userRole);
      const encryptedAuthToken = CryptoJS.AES.encrypt(JSON.stringify(user), 'UbuntuHaha').toString();
      localStorage.setItem('authToken', encryptedAuthToken);
      this.router.navigate(['']);
      this.loginFrom.reset();

      const saveUrl = localStorage.getItem('saveUrl');
      if (saveUrl) {
        this.router.navigate([saveUrl]);
        localStorage.removeItem('saveUrl');
      }
    } else {
      Swal.fire({
        title: "Your fail",
        text: "The account does not exist in the database",
        icon: "error"
      });
    }
  }, (err: any) => {
    Swal.fire({
      title: "Error!",
      text: "server error! Please Run server",
      icon: "error"
    });
  });
}}}
