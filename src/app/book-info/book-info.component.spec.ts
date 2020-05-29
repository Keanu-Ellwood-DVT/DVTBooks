import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookInfoComponent } from './book-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { BookService } from '../services/book.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('BookInfoComponent', () => {
  let component: BookInfoComponent;
  let fixture: ComponentFixture<BookInfoComponent>;
  let modalService: NgbModal;
  let bookService: BookService;

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
    modalService = TestBed.inject(NgbModal);
    bookService = TestBed.inject(BookService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getBook on init', () => {
    const bookServiceSpy = spyOn(bookService, 'getBook').and.callThrough();
    expect(bookServiceSpy).not.toHaveBeenCalled();

    component.ngOnInit();

    expect(bookServiceSpy).toHaveBeenCalledTimes(1);
  });

  it('openModal should call modalService.open', () => {
    const modalServiceSpy = spyOn(modalService, 'open').and.callThrough();
    expect(modalServiceSpy).not.toHaveBeenCalled();

    component.openModal(name);

    expect(modalServiceSpy).toHaveBeenCalledTimes(1);
  });
});
