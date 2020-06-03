import { Author } from '../../shared/models/author';
import { Book } from '../../shared/models/book';
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { BookInfoComponent } from './book-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { BookService } from '../../shared/services/book.service';
import { AuthorService } from '../../shared/services/author.service';

describe('BookInfoComponent', () => {
  let component: BookInfoComponent;
  let fixture: ComponentFixture<BookInfoComponent>;
  let spyModalService: NgbModal;
  let spyBookService: BookService;
  let spyAuthorService: AuthorService;
  const mockAuthor: Author = {
    href: 'http://localhost:4201/Authors/d32490d9-ff78-4e08-b04c-cdeabe9de34c',
    id: 'd32490d9-ff78-4e08-b04c-cdeabe9de34c',
    first_name: 'Robin',
    middle_names: 'Patricia',
    last_name: 'Williams',
    name: 'Robin Patricia Williams',
    about: `Robin Patricia Williams is an American educator who has authored many popular computer-related
    books, as well as the book Sweet Swan of Avon: Did a Woman Write Shakespeare?.`,
    version: 'AAAAAAAAB9Q=',
    books: [
      {
        title: 'Book',
        href: 'http://localhost:4201/Books/$9780133966153',
        id: '9780133966153',
        isbn10: '0133966151',
        isbn13: '9780133966153'
      }
    ]
  };
  const mockBook: Book = {
    isbn10: null,
    isbn13: '9781119038634',
    title: 'Web Design with HTML, CSS, JavaScript and jQuery Set',
    about: null,
    abstract: null,
    author: {
      href: 'http://localhost:4201/Authors/d32490d9-ff78-4e08-b04c-cdeabe9de34c',
      id: 'd32490d9-ff78-4e08-b04c-cdeabe9de34c',
      name: 'Jon  Duckett'
    },
    publisher: 'Wiley',
    date_published: null,
    image: null,
    tags: [
      {
        id: 'HTML',
        href: 'http://localhost:4201/Tags/HTML',
        description: 'HTML'
      }
    ],
    version: null
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot([]), NgbModule, BrowserModule],
      declarations: [ BookInfoComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyModalService = TestBed.inject(NgbModal);
    spyBookService = TestBed.inject(BookService);
    spyAuthorService = TestBed.inject(AuthorService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getBook on init', () => {
    const spyBookServiceSpy = spyOn(spyBookService, 'getBook').and.callThrough();
    expect(spyBookServiceSpy).not.toHaveBeenCalled();

    component.ngOnInit();

    expect(spyBookServiceSpy).toHaveBeenCalledTimes(1);
  });

  it('openModal should call spyModalService.open', () => {
    const spyModalServiceSpy = spyOn(spyModalService, 'open').and.callThrough();
    expect(spyModalServiceSpy).not.toHaveBeenCalled();

    component.openModal(name);

    expect(spyModalServiceSpy).toHaveBeenCalledTimes(1);
  });

  it('should create', fakeAsync(() => {
    spyOn(spyBookService, 'getBook').and.returnValue(of(mockBook));
    spyOn(spyAuthorService, 'getAuthor').and.returnValue(of(mockAuthor));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.book).toEqual(mockBook);
    expect(component.author).toEqual(mockAuthor);
  }));
});
