import { NgModule } from '@angular/core';
import { loginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './auth-routing.module';

@NgModule({  
     declarations: [
        loginComponent,
        RegisterComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    exports: [
        loginComponent,
        RegisterComponent
    ],
    providers: [],
})
export class AuthModule { }
