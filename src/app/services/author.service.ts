import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Author } from 'src/models/author';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  getAuthor(id: string): Observable<Author> {
    return this.http.get<Author>(`${environment.apiUri}/Authors/${id}`);
  }

  getAuthors(query?: string, skip?: number, top?: number): Observable<Author[]> {
    return this.http.get<Author[]>(`${environment.apiUri}/Authors?${query ? 'query=' + query + '&' : ''}${skip ? 'skip=' + skip + '&' : ''}${top ? 'top=' + top : ''}`)
    .pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  putAuthor(authorObj: Author, id?: string) {
    this.http.put(`${environment.apiUri}/Authors/${id ? id : ''}`, authorObj)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      )
      .subscribe(data => { console.log('PUT request was successful. PUT: ', data); }, error => { console.log('Error', error); });
  }
}
