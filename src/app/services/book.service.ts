import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Book } from 'src/models/book';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  private refreshRequired$ = new Subject<void>();

  get refreshNeeded$() {
    return this.refreshRequired$;
  }

  getBook(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${environment.apiUri}/Books/${isbn}`);
  }

  getBooks(query?: string, skip?: number, top?: number): Observable<Book[]> {
    return this.http.get<Book[]>
    (`${environment.apiUri}/Books?${query ? 'query=' + query + '&' : ''}` +
    `${skip ? 'skip=' + skip + '&' : ''}${top ? 'top=' + top : ''}`);
  }

  putBook(bookObj: Book, isbn: string, file?: File) {
    this.http.put(`${environment.apiUri}/Books/${isbn}`, bookObj)
      .pipe(
        tap(() => {
          this.refreshRequired$.next();
        })
      )
      .subscribe();
  }

  updateBook(bookObj: Book, isbn: string) {
    this.http.put(`${environment.apiUri}/Books/${isbn}`, bookObj)
    .pipe(
      tap(() => {
        this.refreshRequired$.next();
      })
    )
    .subscribe();
  }
}
