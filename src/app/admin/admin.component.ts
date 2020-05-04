import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../services/author.service';
import { BookService } from '../services/book.service';
import { Author } from 'src/models/author';
import { Book } from 'src/models/book';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Tag } from 'src/models/tag';
import { TagsService } from '../services/tags.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  pageLoading$ = new BehaviorSubject<boolean>(true);
  form: FormGroup;
  authors: Author[] = [];
  tags: Tag[] = [];
  book: Book;
  newBook: Book;
  model: NgbDateStruct;

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
      this.tags = x
    });
  }

  private addBook() {
    this.bookService.putBook(this.newBook,"");
  }

  uploadPicture(event) {
    // if (event.target.files.length) {
    //  this.bookService.postPicture(this.book.isbn, event.target.files[0])
    // }
  }

}
