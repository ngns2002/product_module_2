import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IBook } from './book';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _book: BehaviorSubject<IBook[]> = new BehaviorSubject<IBook[]>([]);
    public book$: Observable<IBook[]> = this._book.asObservable();
  constructor(private http: HttpClient) {}

  getbook() {
    this.http.get<IBook[]>('http://localhost:3000/book').subscribe((book) => {
      this.books = book;
  });
  }
  getBookById(id: any) {
    return this.http.get('http://localhost:3000/book/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
    get books(): IBook[] {
        return this._book.getValue();
    }
    set books(value: IBook[]) {
        this._book.next(value);
    }
}