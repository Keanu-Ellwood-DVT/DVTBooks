import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthorService } from '../services/author.service';
import { BookService } from '../services/book.service';
import { Author } from 'src/models/author';
import { Book } from 'src/models/book';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Tag } from 'src/models/tag';
import { TagsService } from '../services/tags.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  pageLoading$ = new BehaviorSubject<boolean>(true);
  form: FormGroup;
  authors: Author[] = [];
  tags: Tag[] = [];
  book: Book;
  newBook: Book;
  model: NgbDateStruct;
  imageName = new BehaviorSubject<string>('Choose File');
  imageName$ = this.imageName.asObservable();
  state = 'Add';

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
        this.pageLoading$.next(false);
    });

    this.tagService.getTags().subscribe(x => {
      this.tags = x;
    });

    this.imageName$.subscribe();

  }

  ngOnDestroy() {
    this.imageName.unsubscribe();
  }

}
