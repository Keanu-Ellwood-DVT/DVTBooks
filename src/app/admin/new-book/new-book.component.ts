import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Author, AuthorRef } from 'src/models/author';
import { Book } from 'src/models/book';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Tag } from 'src/models/tag';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';
import { TagsService } from 'src/app/services/tags.service';

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
  authors: Author[] = [];
  tags: Tag[] = [];

  selectedAuth: any = {};
  selectedTag: any = {};

  newBook: Book;

  model: NgbDateStruct;
  file: File;
  time$: Observable<string>;

  imageName = new BehaviorSubject<string>('Choose File');
  imageName$ = this.imageName.asObservable();

  constructor(
    private authorService: AuthorService,
    private bookService: BookService,
    private tagService: TagsService
  ) {
    this.form = new FormGroup({
      title: new FormControl('', { updateOn: 'change' }),
      tag: new FormControl('', { updateOn: 'change' }),
    });
  }

  ngOnInit(): void {
    this.authorService.getAuthors().subscribe(x => {
      this.authors = x,
        // console.log(x[0].name),
        this.pageLoading$.next(false);
    });

    this.tagService.getTags().subscribe(x => {
      this.tags = x;
    });

    this.imageName$.subscribe();

    if (this.state === 'Update' && this.currentBook) {
      this.newBook = this.currentBook;
      this.model = {
        year: parseInt(this.newBook.date_published.slice(0,4)),
        month: parseInt(this.newBook.date_published.slice(5, 7)),
        day: parseInt(this.newBook.date_published.slice(8, 10))
      }
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
    this.newBook.date_published = `${this.model.year}-${this.model.month < 10 ? '0' + this.model.month : this.model.month}-
    ${this.model.day < 10 ? '0' + this.model.day : this.model.day}T00:00:00+00:00`;
    if(!this.newBook.isbn10 || this.newBook.isbn10.length !> 0){
      this.newBook.isbn10 = `${this.newBook.isbn13.slice(3, 12)}1`;
    }
    console.log(this.newBook);
    this.bookService.putBook(this.newBook, this.newBook.isbn13);
    if(this.state !== 'Update'){
      this.bookService.putPicture(this.newBook.isbn13, this.file);
    }
  }

  uploadPicture(event) {
    if (event.target.files.length > 0) {
      this.imageName.next(event.target.files[0].name);
      this.file = event.target.files[0];
    } else {
      this.imageName.next('Choose File');
    }
  }

  changeTag(val: Tag) {
    this.newBook.tags = [{
      href: val.href,
      id: val.id,
      description: val.description
    }];
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
