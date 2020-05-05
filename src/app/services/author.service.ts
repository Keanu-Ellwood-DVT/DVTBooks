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

  private refreshRequired$ = new Subject<void>();

  get refreshNeeded$() {
    return this.refreshRequired$;
  }

  getAuthor(id: string): Observable<Author> {
    return this.http.get<Author>(`${environment.apiUri}/Authors/${id}`);
  }

  getAuthors(query?: string, skip?: number, top?: number): Observable<Author[]> {
    return this.http.get<Author[]>(`${environment.apiUri}/Authors?${query ? 'query=' + query + '&' : ''}
    ${skip ? 'skip=' + skip + '&' : ''}${top ? 'top=' + top : ''}`)
    .pipe(
      tap(() => {
        this.refreshRequired$.next();
      })
    );
  }

  putAuthor(authorObj: Author, id?: string) {
    this.http.put(`${environment.apiUri}/Authors/${id ? id : ''}`, authorObj)
      .pipe(
        tap(() => {
          this.refreshRequired$.next();
        })
      )
      .subscribe(data => { console.log('PUT request was successful. PUT: ', data); }, error => { console.log('Error', error); });
  }
}
