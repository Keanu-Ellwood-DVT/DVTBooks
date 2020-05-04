import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Author } from 'src/models/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) {}

  getAuthor(id: string): Observable<Author> {
    return this.http.get<Author>(`${environment.apiUri}/Authors/${id}`);
  }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${environment.apiUri}/Authors`);
  }

  putAuthor(authorObj: Author, id?: string) {
    this.http.put(`${environment.apiUri}/Books/${id ? id : ''}`, authorObj)
      .subscribe(data => { console.log('PUT request was successful. PUT: ', data); }, error => { console.log('Error', error); });
  }
}
