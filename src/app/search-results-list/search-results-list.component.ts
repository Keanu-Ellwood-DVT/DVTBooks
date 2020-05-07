import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../services/author.service';
import { BookService } from '../services/book.service';
import { TagsService } from '../services/tags.service';
import { Tag } from 'src/models/tag';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Book, BookRef } from 'src/models/book';
import { ActivatedRoute } from '@angular/router';
import { Author } from 'src/models/author';


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
  private currentQuery: string;
  skip = 0;

  constructor(
    private bookService: BookService,
    private tagService: TagsService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currentQuery = params.q,
        this.skip = 0,
        this.books.length = 0,
        this.searchBooks();
    });

    this.tagService.getTags().subscribe(x => {
      this.tags = x;
    });

    this.bookService.refreshNeeded$
      .subscribe(() => {
        this.searchBooks();
      });
  }

  private searchBooks() {
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

  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value === e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
    if (checkArray.length > 0) {
      let tempBooks: Book[] = [];

      this.books.forEach(book => {
        book.tags.forEach(tag => {
          if (tag.id === e.target.value && !tempBooks.includes(book)) {
            tempBooks.push(book);
            console.log(book);
            return;
          }
        });
        this.booksDisplay = tempBooks;
      });
    } else {
      this.booksDisplay = this.books;
    }
  }

}
