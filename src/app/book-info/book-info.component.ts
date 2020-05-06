import { Component, OnInit, Input } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from 'src/models/book';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

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

  constructor(
    private bookService: BookService,
    public auth: AuthService,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => this.isbn = params.isbn );
  }

  ngOnInit(): void {
    this.bookService.getBook(this.isbn).subscribe(x => {
      this.book = x,
      this.pageLoading$.next(false);
    });
  }

  openModal(content) {
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop', centered: true });
  }

}
