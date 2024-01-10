import { Component, OnInit } from '@angular/core';
import { ApiService } from '../books.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'booklist-app',
    templateUrl: 'book-list.component.html',
    styleUrls: ['./book-list.component.css']
})

export class booklistComponent implements OnInit {
    booklist: any[] = [];
    isLoggedIn: boolean = false; 

    constructor(private api: ApiService, private auth: AuthService) { }

    ngOnInit(): void {
        this.HandleGetBook();
        this.api.books.subscribe((res: any) => {
            this.booklist = res;
        });
    }
    HandleGetBook() :void {
        this.api.getbook();
    }
}
