import { NgModule } from '@angular/core';
import { headerComponent } from './components/header.component';
import { RouterModule } from '@angular/router';
import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [
    headerComponent
  ],
  declarations: [
    headerComponent
  ],
  providers: [],
})
export class SharedModule {}
