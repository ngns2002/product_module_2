import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { bookdetailComponent } from './book-detail/book-detail.component';
import { booklistComponent } from './book-list/book-list.component';

const routes: Routes = [
    { path: 'detail/:id', component: bookdetailComponent},
    { path: '', component: booklistComponent},
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class BookRoutingModule { }