import { Book } from '../../shared/models/book';
import { Observable, of, Subject } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchResultsListComponent } from './search-results-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Tag } from 'src/app/shared/models/tag';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TagsService } from '../../shared/services/tags.service';
import { BookService } from '../../shared/services/book.service';

describe('SearchResultsListComponent', () => {
  let component: SearchResultsListComponent;
  let fixture: ComponentFixture<SearchResultsListComponent>;
  let spyBookService: MockBookService;
  let spyTagsService: MockTagsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, RouterModule.forRoot([]), ReactiveFormsModule],
      declarations: [SearchResultsListComponent],
      providers: [
        { provide: TagsService, useClass: MockTagsService },
        { provide: BookService, useClass: MockBookService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsListComponent);
    component = fixture.componentInstance;
    spyTagsService = new MockTagsService();
    spyBookService = new MockBookService();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with skip at `0`', () => {
    expect(component.skip).toEqual(0);
  });

  it('should be able to increment skip', () => {

    component.skip = 0;

    component.viewMore();

    expect(component.skip).toEqual(6);
  });

  it('should set tags', () => {
    fixture.detectChanges();

    expect(component.tags).toEqual([{} as Tag, ]);
  });

  it('should invoke searchBooks()', async () => {
    // let response: Book[] = [];
    // let searchBookSpy = jasmine.createSpy('searchBookSpy');
    spyOn(component, 'searchBooks').and.callThrough();

    fixture.detectChanges();
    // spyBookService.refreshRequired$.next();
    // spyBookService.refreshNeeded$.subscribe(() => {

    // }
    // )
    expect(component.booksDisplay).toEqual([mockBook, ]);
  });

  describe('onCheckboxChange', () => {
    it('should be invoked when checkbox clicked', async () => {
      const tagCheck = fixture.debugElement.query(By.css('#Tag')).nativeElement;
      tagCheck.disabled = false;
      const spy = spyOn(component, 'onCheckboxChange').and.callThrough();
      tagCheck.click();
      expect(spy).toHaveBeenCalled();
    });
    it('should be invoked when checkbox clicked', async () => {
      const tagCheck = fixture.debugElement.query(By.css('#Tag')).nativeElement;
      tagCheck.disabled = false;
      tagCheck.checked = true;
      const spy = spyOn(component, 'onCheckboxChange').and.callThrough();
      tagCheck.click();
      expect(spy).toHaveBeenCalled();
    });
    // it('should remove tag from array when unchecked', async () => {
    //   const tagCheck = fixture.debugElement.query(By.css('#Tag')).nativeElement;
    //   tagCheck.disabled = false;
    //   tagCheck.checked = true;

    //   let spy = spyOn(component, 'onCheckboxChange').and.callThrough();
    //   tagCheck.click();
    //   console.log(component.checkArray.controls.values);
    //   expect(component.checkArray[0]).toEqual('Tag');
    //   expect(tagCheck.checked).toBeFalse();
    //   expect(spy).toHaveBeenCalled();
    // });
  });

});

const mockTag: Tag = {
  id: 'HTML',
  href: '/Tags/HTML',
  description: 'HTML'
};

class MockTagsService {
  getTags(): Observable<Tag[]> {
    return of([{} as Tag, ]);
  }
}

const mockBook: Book = {
  isbn10: null,
  isbn13: '9781119038634',
  title: 'Web Design with HTML, CSS, JavaScript and jQuery Set',
  about: null,
  abstract: null,
  author: {
    href: 'http://localhost:4201/Authors/3cc636ea-1e66-4064-bf03-4f4f70982d1a',
    id: '3cc636ea-1e66-4064-bf03-4f4f70982d1a',
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

class MockBookService {
  refreshRequired$ = new Subject<void>();

  get refreshNeeded$() {
    return this.refreshRequired$;
  }

  getBooks(): Observable<Book[]> {
    return of([mockBook, ]);
  }
}
