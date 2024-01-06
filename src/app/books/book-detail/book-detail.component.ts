import { Component, OnInit } from '@angular/core';
import { ApiService } from '../books.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'book-detail-app',
    templateUrl: 'book-detail.component.html',
    styleUrls: ['./book-detail.component.css']
})

export class bookdetailComponent implements OnInit {
       book: any = null;

    constructor(private api: ApiService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
        this.api.getBookById(id).subscribe((res) => {
            console.log(res);
            this.book = res;
        });
    }
}
}