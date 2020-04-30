import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from 'src/models/book';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getBook(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${environment.apiUri}/Books/${isbn}`);
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.apiUri}/Books`);
  }

  patchBook(patchBook: Book, isbn?: string) {
    this.http.patch(`${environment.apiUri}/Books/${isbn ? isbn : ''}`, patchBook)
      .subscribe(data => {console.log('PATCH request was successful. Patched: ', data); }, error => {console.log('Error', error); });
  }

  createBook(postBook: Book) {
    this.http.post(`${environment.apiUri}/Books`, postBook)
      .subscribe(data => {console.log('POST request was successful. Posted: ', data); }, error => {console.log('Error', error); });
  }

}
