import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IBook } from './book';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _books: BehaviorSubject<IBook[]> = new BehaviorSubject<IBook[]>([]);

  constructor(private http: HttpClient) {}

  getbook() {
    return this.http.get<IBook[]>('http://localhost:3000/book')
      .subscribe((e: IBook[]) =>{
        this._books.next(e); 
      });
  }
  getBookById(id: any) {
    return this.http.get('http://localhost:3000/book/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  get books(): Observable<IBook[]>{
    return this._books.asObservable();
  }

  set books(books: Observable<IBook[]>){
    books.subscribe(books => {
      this._books.next(books);
    });
  }
}
