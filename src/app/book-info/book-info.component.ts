import { Component, OnInit, Input } from '@angular/core';
import { AuthorService } from '../services/author.service';
import { BookService } from '../services/book.service';
import { TagsService } from '../services/tags.service';
import { Book } from 'src/models/book';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class BookInfoComponent implements OnInit {
  @Input() isbn: string;

  pageLoading$ = new BehaviorSubject<boolean>(true);
  book: Book;
  bookImage: Book;

  constructor(
    private authorService: AuthorService,
    private bookService: BookService,
    private tagService: TagsService
    ) { }

  ngOnInit(): void {
    this.bookService.getBook('9781838555726').subscribe(x => {
      this.book = x,
      this.pageLoading$.next(false);
    });

    this.bookService.getPicture('9781838555726').subscribe(x => {
      this.bookImage = x;
    })

  }

}
