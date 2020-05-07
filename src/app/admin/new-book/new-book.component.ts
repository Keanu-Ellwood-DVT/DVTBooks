import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Author } from 'src/models/author';
import { Book } from 'src/models/book';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { Tag } from 'src/models/tag';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';
import { TagsService } from 'src/app/services/tags.service';
import * as moment from 'moment';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit, OnDestroy {

  @Input()
  state: string;

  @Input()
  currentBook?: Book;

  pageLoading$ = new BehaviorSubject<boolean>(true);
  form: FormGroup;
  authors: Author[];
  tags: Tag[];

  selectedAuth: any = {};
  selectedTag: any = {};

  newBook: Book;

  model: NgbDateStruct;
  file: File;
  time$: Observable<string>;
  submitted = false;
  imageName = new BehaviorSubject<string>('Choose File');
  imageName$ = this.imageName.asObservable();

  constructor(
    private authorService: AuthorService,
    private bookService: BookService,
    private tagService: TagsService
  ) {
    this.form = new FormGroup({
      title: new FormControl('', { validators: [ Validators.required ]}),
      author: new FormControl(''),
      tag: new FormControl(''),
      isbn13: new FormControl('', { validators: [ Validators.required ]}),
      isbn10: new FormControl(''),
      publisher: new FormControl('', { validators: [ Validators.required ]}),
      dp: new FormControl('', { validators: [ Validators.required ]}),
      about: new FormControl(''),
      filename: new FormControl('')
    });
  }

  get title(): AbstractControl { return this.form.get('title'); }
  get author(): AbstractControl { return this.form.get('author'); }
  get tag(): AbstractControl { return this.form.get('tags'); }
  get isbn13(): AbstractControl { return this.form.get('isbn13'); }
  get isbn10(): AbstractControl { return this.form.get('isbn10'); }
  get publisher(): AbstractControl { return this.form.get('publisher'); }
  get dp(): AbstractControl { return this.form.get('dp'); }
  get about(): AbstractControl { return this.form.get('about'); }
  get filename(): AbstractControl { return this.form.get('filename'); }

  ngOnInit(): void {

    this.authorService.refreshNeeded$
      .subscribe(() => {
        this.fillSelect();
      });
    this.fillSelect();

    this.tagService.getTags().subscribe(x => {
      this.tags = x;
    });

    this.imageName$.subscribe();

    if (this.state === 'Update' && this.currentBook) {
      this.newBook = this.currentBook;
      this.model = {
        year: parseInt(this.newBook.date_published.slice(0, 4), 10),
        month: parseInt(this.newBook.date_published.slice(5, 7), 10),
        day: parseInt(this.newBook.date_published.slice(8, 10), 10)
      };
    } else {
      this.newBook = {
        isbn10: null,
        isbn13: '',
        title: '',
        about: null,
        abstract: null,
        author: {
          href: '',
          id: '',
          name: '',
        },
        publisher: '',
        date_published: '',
        image: null,
        tags: [{
          id: '',
          href: '',
          description: '',
        }],
        version: null
      };
    }
  }

  addBook() {
    this.newBook.date_published = `${this.model.year}-${this.model.month < 10 ? '0' + this.model.month : this.model.month}` +
    `-${this.model.day < 10 ? '0' + this.model.day : this.model.day}T00:00:00+00:00`;
    console.log(this.newBook);
    console.log(moment('').add(this.model.year, 'year').add(this.model.month, 'month').add(this.model.day, 'day').format());
    console.log(moment([this.model.year, this.model.month - 1, this.model.day]));

    if (this.file) {
      this.bookService.putBook(this.newBook, this.newBook.isbn13, this.file);
    } else {
      this.bookService.updateBook(this.newBook, this.newBook.isbn13);
    }
    this.submitted = true;
  }

  private fillSelect() {
    this.authorService.getAuthors().subscribe(x => {
      this.authors = x,
      this.pageLoading$.next(false);
    });
  }

  uploadPicture(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.imageName.next(event.target.files[0].name);
    } else {
      this.imageName.next('Choose File');
    }
  }

  changeTag(val: Tag[]) {
    this.newBook.tags = val;
  }

  changeAuth(val: Author) {
    this.newBook.author = {
      href: val.href,
      id: val.id,
      name: val.name
    };
  }

  ngOnDestroy() {
    this.imageName.unsubscribe();
  }

}
