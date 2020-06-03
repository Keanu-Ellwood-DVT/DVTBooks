import { Tag } from '../../shared/models/tag';
import { Author } from '../../shared/models/author';
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { AuthorService } from '../../shared/services/author.service';
import { TagsService } from '../../shared/services/tags.service';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let httpTestingController: HttpTestingController;
  let spyAuthorService: AuthorService;
  let spyTagsService: TagsService;
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
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, RouterModule.forRoot([]), ReactiveFormsModule],
      declarations: [AdminComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, RouterModule.forRoot([]), ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyAuthorService = TestBed.inject(AuthorService);
    spyTagsService = TestBed.inject(TagsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', fakeAsync(() => {
    spyOn(spyAuthorService, 'getAuthors').and.returnValue(of([mockAuthor, ]));
    spyOn(spyTagsService, 'getTags').and.returnValue(of([{} as Tag, ]));
    component.ngOnInit();
    fixture.detectChanges();
    console.log(component.authors);
    expect(component.authors).toEqual([mockAuthor, ]);
    expect(component.tags).toEqual([{} as Tag, ]);
  }));
});
