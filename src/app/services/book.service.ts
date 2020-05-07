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

  patchBook(patchBook: Book, isbn?: string) {
    this.http.patch(`${environment.apiUri}/Books/${isbn ? isbn : ''}`, patchBook)
      .subscribe(data => { console.log('PATCH request was successful. Patched: ', data); },
      error => { console.log('Error', error); });
  }

  getBooks(query?: string, skip?: number, top?: number): Observable<Book[]> {
    return this.http.get<Book[]>
    (`${environment.apiUri}/Books?${query ? 'query=' + query + '&' : ''}` +
    `${skip ? 'skip=' + skip + '&' : ''}${top ? 'top=' + top : ''}`);
  }

  postBook(bookObj: Book) {
    this.http.post(`${environment.apiUri}/Books`, bookObj)
      .subscribe(data => { console.log('POST request was successful. Posted: ', data); },
      error => { console.log('Error', error); });
  }

  putBook(bookObj: Book, isbn: string, file?: File) {
    this.http.put(`${environment.apiUri}/Books/${isbn}`, bookObj)
      .pipe(
        tap(() => {
          this.refreshRequired$.next();
        })
      )
      .subscribe(data => { console.log('PUT request was successful. PUT: ', data),
      this.putPicture(isbn, file); }, error => { console.log('Error', error); });
  }

  updateBook(bookObj: Book, isbn: string) {
    this.http.put(`${environment.apiUri}/Books/${isbn}`, bookObj)
    .pipe(
      tap(() => {
        this.refreshRequired$.next();
      })
    )
    .subscribe(data => { console.log('PUT request was successful. PUT: ', data); }, error => { console.log('Error', error); });
  }

  getPicture(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${environment.apiUri}/Books/${isbn}/picture`);
  }

  putPicture(isbn: string, file: File) {
    this.http.put(`${environment.apiUri}/Books/${isbn}/picture`, file)
      .subscribe(data => { console.log('PUT request was successful. PUT: ', data); },
      error => { console.log('Error', error); });
  }
}
