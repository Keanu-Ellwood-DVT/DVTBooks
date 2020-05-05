import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../services/author.service';
import { BookService } from '../services/book.service';
import { TagsService } from '../services/tags.service';
import { Tag } from 'src/models/tag';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';import { Book, BookRef } from 'src/models/book';
import { ActivatedRoute } from '@angular/router';
import { Author } from 'src/models/author';
;

@Component({
  selector: 'app-search-results-list',
  templateUrl: './search-results-list.component.html',
  styleUrls: ['./search-results-list.component.css']
})
export class SearchResultsListComponent implements OnInit {

  tags: Tag[] = [];
  form: FormGroup;
  books: Book[] = [];
  authBooks: BookRef[] = [];
  authors: Author[] = [];
  config: any;
  private currentCategory: string;
  private currentQuery: string;

  constructor(
    private authorService: AuthorService,
    private bookService: BookService,
    private tagService: TagsService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    });

    this.config = {
      itemsPerPage: 6,
      currentPage: 1,
      totalItems: this.books.length
    };
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currentQuery = params.q,
      this.currentCategory = params.cat
     });

    this.tagService.getTags().subscribe(x => {
      this.tags = x;
    });

    this.bookService.refreshNeeded$
      .subscribe(() => {
        this.searchBooks();
    });

    this.searchBooks();
  }

  private searchBooks() {
    this.bookService.getBooks(this.currentQuery).subscribe(x => {
      this.books = x;
    });
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

}
