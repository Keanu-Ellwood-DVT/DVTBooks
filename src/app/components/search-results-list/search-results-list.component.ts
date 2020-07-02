import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/shared/models/tag';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, Form } from '@angular/forms';
import { Book } from 'src/app/shared/models/book';
import { ActivatedRoute } from '@angular/router';
import { Author } from 'src/app/shared/models/author';
import { BookService } from '../../shared/services/book.service';
import { TagsService } from '../../shared/services/tags.service';


@Component({
  selector: 'app-search-results-list',
  templateUrl: './search-results-list.component.html',
  styleUrls: ['./search-results-list.component.css']
})
export class SearchResultsListComponent implements OnInit {

  tags: Tag[] = [];
  form: FormGroup;
  books: Book[] = [];
  booksDisplay: Book[] = [];
  authors: Author[] = [];
  currentQuery: string;
  skip = 0;
  checkArray: FormArray;
  radioSelected: any;

  constructor(
    private bookService: BookService,
    private tagService: TagsService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentQuery = params.q,
        this.skip = 0,
        this.books.length = 0,
        this.searchBooks();
    });

    console.log(this.route.params);
    this.tagService.getTags().subscribe(x => {
      this.tags = x;
    });

    this.bookService.refreshNeeded$
      .subscribe(() => {
        this.searchBooks();
      });
  }

  searchBooks() {
    this.resetRadio();
    this.bookService.getBooks(this.currentQuery, this.skip, 6).subscribe(x => {
      x.forEach(book => {
        this.books.push(book);
      }),
        this.booksDisplay = this.books;
    });
  }

  viewMore() {
    this.skip += 6;
    this.searchBooks();
  }

  sortViaTag() {
    const taggedBooks = [];
    this.books.forEach(book => {
      book.tags.forEach(tag => {
        /* istanbul ignore else*/
        if (tag.id === this.radioSelected) {
          taggedBooks.push(book);
          return;
        }
      });
      this.booksDisplay = taggedBooks;
    });
  }

  resetRadio() {
    this.radioSelected = null;
    this.booksDisplay = this.books;
  }
}
