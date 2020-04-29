import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tag } from 'src/models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http: HttpClient) {}

  getTag(name: string): Observable<Tag> {
    return this.http.get<Tag>(`${environment.apiUri}/Tags/${name}`);
  }

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${environment.apiUri}/Tags`);
  }

}
