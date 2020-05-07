import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BookService } from '../services/book.service';
import { AuthorService } from '../services/author.service';
import { ActivatedRoute } from '@angular/router';
import { Author } from 'src/models/author';
import { BookRef } from 'src/models/book';
import { AuthService } from '../auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-author-info',
  templateUrl: './author-info.component.html',
  styleUrls: ['./author-info.component.css']
})
export class AuthorInfoComponent implements OnInit {
  pageLoading$ = new BehaviorSubject<boolean>(true);
  id: string;
  author: Author;
  authBooks: BookRef[];
  state = 'Update';

  constructor(
    private authorService: AuthorService,
    public auth: AuthService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {
    this.route.params.subscribe(params => this.id = params.id)
  }

  ngOnInit(): void {
    this.authorService.getAuthor(this.id).subscribe(x => {
      this.author = x,
        this.authBooks = this.author.books,
        this.pageLoading$.next(false);
    });
  }

  openModal(content) {
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop', centered: true });
  }

}
