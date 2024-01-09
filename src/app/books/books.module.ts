import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { bookdetailComponent } from './book-detail/book-detail.component';
import { BrowserModule } from '@angular/platform-browser';
import { BookRoutingModule } from './book-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    BrowserModule,
    BookRoutingModule,
    FormsModule 
  ],
  exports: [
    bookdetailComponent,
  ],
  declarations: [
    bookdetailComponent,
  ],
  providers: [],
})
export class BookdModule {}
