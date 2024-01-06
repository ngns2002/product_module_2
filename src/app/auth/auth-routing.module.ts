import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';



const routes: Routes = [
  { path: 'login', component: loginComponent },
  { path: 'register', component: RegisterComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }