import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header.component';
import { RouterModule } from '@angular/router';
import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [
    HeaderComponent
  ],
  declarations: [
    HeaderComponent
  ],
  providers: [],
})
export class SharedModule {}
