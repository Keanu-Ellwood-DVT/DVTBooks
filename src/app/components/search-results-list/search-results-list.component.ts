import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/shared/models/tag';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
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
  private currentQuery: string;
  skip = 0;
  checkArray: FormArray;

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

  searchBooks() {
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
    this.checkArray = this.form.get('checkArray') as FormArray;
    if (e.target.checked) {
      this.checkArray.push(new FormControl(e.target.value));
    } else {
      let i = 0;
      this.checkArray.controls.forEach((item: FormControl) => {
        if (item.value === e.target.value) {
          this.checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
    if (this.checkArray.length > 0) {
      const tempBooks: Book[] = [];

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
