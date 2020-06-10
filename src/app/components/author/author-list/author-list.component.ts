import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/shared/models/author';
import { BehaviorSubject } from 'rxjs';
import { AuthorService } from '../../../shared/services/author.service';

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
