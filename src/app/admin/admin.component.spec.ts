import { Tag } from './../../models/tag';
import { Author } from './../../models/author';
import { TagsService } from './../services/tags.service';
import { AuthorService } from 'src/app/services/author.service';
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let httpTestingController: HttpTestingController;
  let spyAuthorService: AuthorService;
  let spyTagsService: TagsService;
  
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
    spyOn(spyAuthorService, 'getAuthors').and.returnValue(of([{} as Author, ]));
    spyOn(spyTagsService, 'getTags').and.returnValue(of([{} as Tag, ]));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.authors).toEqual([{} as Author, ]);
    expect(component.tags).toEqual([{} as Tag, ]);
  }));
});
