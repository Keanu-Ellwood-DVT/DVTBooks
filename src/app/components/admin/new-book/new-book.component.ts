import { catchError } from 'rxjs/operators';
import { Component, OnInit, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
import { Author } from 'src/app/shared/models/author';
import { Book } from 'src/app/shared/models/book';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { Tag } from 'src/app/shared/models/tag';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AuthorService } from 'src/app/shared/services/author.service';
import { BookService } from 'src/app/shared/services/book.service';
import { TagsService } from 'src/app/shared/services/tags.service';
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
  imageName = new BehaviorSubject<string>('Choose File');
  imageName$ = this.imageName.asObservable();
  staticAlertClosed = true;
  toastMessage = '';
  error: boolean = false;
  link: string = '';

  constructor(
    private authorService: AuthorService,
    private bookService: BookService,
    private tagService: TagsService,
    private cd: ChangeDetectorRef
  ) {
    this.form = new FormGroup({
      title: new FormControl('', { validators: [Validators.required] }),
      author: new FormControl(''),
      tag: new FormControl(''),
      isbn13: new FormControl('', { validators: [Validators.required, Validators.pattern('[0-9]{3}[-[0-9]{10}|[0-9]{10}]')] }),
      isbn10: new FormControl(''),
      publisher: new FormControl('', { validators: [Validators.required] }),
      dp: new FormControl('', { validators: [Validators.required] }),
      about: new FormControl(''),
      abstract: new FormControl(''),
      filename: new FormControl('')
    });
  }

  get title(): AbstractControl { return this.form.get('title'); }
  get author(): AbstractControl { return this.form.get('author'); }
  get tag(): AbstractControl { return this.form.get('tag'); }
  get isbn13(): AbstractControl { return this.form.get('isbn13'); }
  get isbn10(): AbstractControl { return this.form.get('isbn10'); }
  get publisher(): AbstractControl { return this.form.get('publisher'); }
  get dp(): AbstractControl { return this.form.get('dp'); }
  get about(): AbstractControl { return this.form.get('about'); }
  get abstract(): AbstractControl { return this.form.get('abstract'); }
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

  close() {
    this.staticAlertClosed = true;
  }

  addBook() {
    this.newBook.isbn13 = this.newBook.isbn13.trim().replace('-', '');
    this.newBook.date_published = moment([this.model.year, this.model.month - 1, this.model.day]).format();
    if (this.file) {
      this.bookService.putBook(this.newBook, this.newBook.isbn13)
        .pipe(
          catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          this.staticAlertClosed = false;
          setTimeout(() => this.staticAlertClosed = true, 5000);
          this.error = true;
          this.toastMessage = "Request failed";
          return throwError(err);
          })
        )
        .subscribe(() => {
          this.bookService.putPicture(this.newBook.isbn13, this.file)
            .pipe(
              catchError(err => {
                console.log('Handling error locally and rethrowing it...', err);
                this.staticAlertClosed = false;
                this.error = true;
                this.toastMessage = "Request failed";
                return throwError(err);
              })
            )
            .subscribe(
              res => console.log('HTTP response', res),
              err => console.log('HTTP Error', err),
              () => {
                this.staticAlertClosed = false,
                this.error = false,
                this.link = `/book/${this.newBook.isbn13}`,
                this.toastMessage = "Request successful",
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
                },
                this.cd.detectChanges()
              }
            );
        });
    } else {
      this.bookService.updateBook(this.newBook, this.newBook.isbn13).pipe(
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          this.staticAlertClosed = false;
          this.error = true;
          this.toastMessage = "Request failed";
          return throwError(err);
        })
      )
        .subscribe(
          res => console.log('HTTP response', res),
          err => console.log('HTTP Error', err),
          () => {
            this.staticAlertClosed = false;
            this.error = false,
            this.toastMessage = "Request successful"
          }
        );
    }
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

  setTag(val: Tag[]) {
    this.newBook.tags = val;
  }

  setAuthor(val: Author) {
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
