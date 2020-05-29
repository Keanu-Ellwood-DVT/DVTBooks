import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorInfoComponent } from './author-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { AuthorService } from '../services/author.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AuthorInfoComponent', () => {
  let component: AuthorInfoComponent;
  let fixture: ComponentFixture<AuthorInfoComponent>;
  let authorService: AuthorService;
  let modalService: NgbModal;

  beforeEach(async(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientTestingModule, FormsModule, RouterModule.forRoot([]), ReactiveFormsModule, NgbModule, BrowserModule],
      declarations: [ AuthorInfoComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authorService = TestBed.inject(AuthorService);
    modalService = TestBed.inject(NgbModal);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAuthor on init', () => {
    const authorServiceSpy = spyOn(authorService, 'getAuthor').and.callThrough();
    expect(authorServiceSpy).not.toHaveBeenCalled();

    component.ngOnInit();

    expect(authorServiceSpy).toHaveBeenCalledTimes(1);
  });

  it('openModal should call open', () => {
    const modalServiceSpy = spyOn(modalService, 'open').and.callThrough();
    expect(modalServiceSpy).not.toHaveBeenCalled();

    component.openModal(name);

    expect(modalServiceSpy).toHaveBeenCalledTimes(1);
  });
});
