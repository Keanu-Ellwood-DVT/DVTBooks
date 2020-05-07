import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../services/author.service';
import { Author } from 'src/models/author';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {
  pageLoading$ = new BehaviorSubject<boolean>(true);
  authors: Author[] = [];

  constructor(private authorService: AuthorService) { }

  ngOnInit(): void {
    this.authorService.getAuthors().subscribe(x => {
      this.authors = x,
        this.pageLoading$.next(false);
    });
  }

}
