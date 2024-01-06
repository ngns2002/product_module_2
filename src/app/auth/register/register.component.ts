import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { AuthService } from '../auth.service';

@Component({
    selector: 'register-app',
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
    registerForm!: FormGroup;
    constructor( 
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        ) {
     }
    ngOnInit() : void {
        this.registerForm = this.formBuilder.group({
          user: ['', [Validators.required, Validators.minLength(3),
          Validators.maxLength(20), Validators.pattern(/^[a-zA-Z0-9]*$/)]],
          email: ['', [Validators.required, Validators.email]],
          name:['', [Validators.required, Validators.maxLength(50)]],
          phone:['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
          local:['', [Validators.required, Validators.maxLength(100)]],
          pass: ['', [Validators.required, Validators.minLength(8), 
          Validators.maxLength(32), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/)]],
          confirmPass: ['', [Validators.required]],
          role: ['user'],
          },);
     }
     RegisTer() {
      if (this.registerForm.invalid) {
        let errorMessage = 'Oh no! There seems to be an error with your input:';
        const formControls = this.registerForm.controls;
        if (formControls.user.errors) {
          errorMessage += '\n User: Must be between 3 and 20 characters without special characters.';
        }
        if (formControls.email.errors) {
          errorMessage += '\n Email: Must be a valid email address.';
        }
        if (formControls.name.errors) {
          errorMessage += '\n Name: Maximum length is 50';
        }
        if (formControls.phone.errors) {
          errorMessage += '\n Phone: Please enter 0-9 and max 10 numbers';
        }
        if (formControls.pass.errors) {
          errorMessage += '\n Password: Password is not valid';
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
        const user = this.registerForm.value;
        user.isLoggedIn = true;
    
        this.authService.registerUser(user)
          .subscribe(
            (res) => {
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
                title: "register in successfully"
              });
              const encryptedAuthToken = CryptoJS.AES.encrypt(JSON.stringify(user), 'ubuntuhaha').toString(); // Encrypt user info before saving to localStorage
              localStorage.setItem('authToken', encryptedAuthToken); // Save encrypted user info to localStorage
              this.registerForm.reset();
              this.router.navigate(['login']);
            },
            (err) => {
              Swal.fire({
                title: "Server Error",
                text: "server error! Please Run server",
                icon: "error"
              });
            }
          );
      }
    }
  }    