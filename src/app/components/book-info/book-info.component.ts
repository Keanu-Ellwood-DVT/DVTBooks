import { Component, OnInit } from '@angular/core';
import { Book, BookRef } from 'src/app/shared/models/book';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Author } from 'src/app/shared/models/author';
import { BookService } from '../../shared/services/book.service';
import { AuthorService } from '../../shared/services/author.service';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class BookInfoComponent implements OnInit {

  pageLoading$ = new BehaviorSubject<boolean>(true);
  book: Book;
  bookImage: Book;
  state = 'Update';
  isbn: string;
  author: Author;
  authBooks: BookRef[];

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    public auth: AuthService,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => this.isbn = params.isbn );
  }

  ngOnInit(): void {
    this.bookService.getBook(this.isbn).subscribe(x => {
      this.book = x,
      this.authorService.getAuthor(this.book.author.id).subscribe(authorData => {
        this.author = authorData,
        this.authBooks = this.author.books;
      }),
      this.pageLoading$.next(false);
    });
  }

  openModal(content) {
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop', centered: true });
  }

}
