import { Book } from '../../../shared/models/book';
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { NewBookComponent } from './new-book.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';
import { Author } from 'src/app/shared/models/author';
import { BookService } from 'src/app/shared/services/book.service';

describe('NewBookComponent', () => {
  let component: NewBookComponent;
  let fixture: ComponentFixture<NewBookComponent>;
  let imageNameSubscription: BehaviorSubject<string>;
  let spyBookService: BookService;
  const dpKey = 'dp';
  const publisherKey = 'publisher';
  const isbn13Key = 'isbn13';
  const titleKey = 'title';
  const mockTag = [
    {
      id: 'Redux',
      href: '/Tags/Redux',
      description: 'Redux'
    }
  ];
  const mockAuth: Author = {
    href: 'http://localhost:4201/Authors/3cc636ea-1e66-4064-bf03-4f4f70982d1a',
    id: '3cc636ea-1e66-4064-bf03-4f4f70982d1a',
    first_name: 'Jon',
    last_name: 'Duckett',
    name: 'Jon  Duckett',
    about: `Jon Duckett has been helping companies create innovative digital solutions for over 15 years,
  designing and delivering web and mobile projects for small businesses and tech startups through to global
  brands like Diesel, Philips, Nike, Wrangler, and Xerox.During this time, he has has written and co-authored
  over a dozen books on web design and programming.`,
    version: 'AAAAAAAAB9M=',
    books: [
      {
        href: 'http://localhost:4201/Books/9781119038634',
        id: '9781119038634',
        isbn13: '9781119038634',
        title: 'Agile Principles, Patterns, and Practices in C#: AGILE PRIN PATTS PRACTS C#',
        isbn10: null
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
      href: 'http://localhost:4201/Authors/3cc636ea-1e66-4064-bf03-4f4f70982d1a',
      id: '3cc636ea-1e66-4064-bf03-4f4f70982d1a',
      name: 'Jon  Duckett'
    },
    publisher: 'Wiley',
    date_published: '2015-01-11',
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
  const mockModel: NgbDateStruct = {
    year: 2015,
    month: 1,
    day: 11
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewBookComponent],
      imports: [HttpClientTestingModule, FormsModule, RouterModule.forRoot([]), ReactiveFormsModule, NgbModule, BrowserModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();

    imageNameSubscription = new BehaviorSubject<string>('');
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, RouterModule.forRoot([]), ReactiveFormsModule, NgbModule, BrowserModule]
    });
    fixture = TestBed.createComponent(NewBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyBookService = TestBed.inject(BookService);
    imageNameSubscription = new BehaviorSubject<string>('');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set newBook and model', () => {
    component.state = 'Update';
    component.currentBook = mockBook;
    const spy = spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    component.newBook = component.currentBook;

    expect(component.currentBook).toEqual(mockBook);
    expect(component.model).toEqual(mockModel);
    expect(component.state).toBe('Update');
    expect(spy).toHaveBeenCalled();
  });

  it('should call the addBook method', async () => {
    const spy = spyOn(component, 'addBook');
    const input = fixture.debugElement.query(By.css('#addBookBtn'));

    input.triggerEventHandler('click', null);

    expect(spy).toHaveBeenCalled();
  });

  it('should call putBook when a file is provided', async () => {
    const spy = spyOn(spyBookService, 'putBook').and.returnValue(of());
    component.form.controls[dpKey].setValue({
      year: '2015',
      month: '1',
      day: '11'
    });
    component.file = {} as File;

    component.addBook();

    expect(spy).toHaveBeenCalled();
  });

  it('should call updateBook when no file is provided', async () => {
    const spy = spyOn(spyBookService, 'updateBook').and.returnValue(of());
    component.form.controls[dpKey].setValue({
      year: '2015',
      month: '1',
      day: '11'
    });

    component.addBook();

    expect(spy).toHaveBeenCalled();
  });

  it('form should be invalid', async () => {
    component.form.controls[titleKey].setValue('');
    component.form.controls[isbn13Key].setValue('');
    component.form.controls[publisherKey].setValue('');
    component.form.controls[dpKey].setValue({
      year: '',
      month: '',
      day: ''
    });
    expect(component.form.valid).toBeFalsy();
  });

  it('form should be valid', async () => {
    component.form.controls[titleKey].setValue('Book');
    component.form.controls[isbn13Key].setValue('9781234567891');
    component.form.controls[publisherKey].setValue('Publisher');
    component.form.controls[dpKey].setValue(mockModel);
    expect(component.form.valid).toBeTruthy();
  });

  it('unsubscribes when destroyed', () => {
    fixture.detectChanges();
    const imageNameSubscriptionSpy = spyOn(imageNameSubscription, 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(imageNameSubscriptionSpy).not.toHaveBeenCalled();
  });
  describe('uploadPicture()', () => {
    it('should be called when an image upload event is fired', async () => {
      const spy = spyOn(component, 'uploadPicture');
      const input = fixture.debugElement.query(By.css('#customFile'));

      input.triggerEventHandler('change', { target: null } as Event);

      expect(spy).toHaveBeenCalled();
    });

    it('should set the text content of the imageName label to "Choose File" if no image was uploaded', async () => {
      const event = { target: { files: [] } };
      const label = fixture.debugElement.nativeElement.querySelector('#imageName');

      component.uploadPicture(event);

      component.imageName$.subscribe(() => {
        fixture.detectChanges();
        expect(label.textContent.trim()).toBe('Choose File');
      });
    });

    it('should set the text content of the imageName label to "Uploaded File" if an image was uploaded', fakeAsync(() => {
      const event = { target: { files: [{ name: 'Uploaded File' }, ] } };
      const label = fixture.debugElement.nativeElement.querySelector('#imageName');

      component.uploadPicture(event);

      component.imageName$.subscribe(() => {
        fixture.detectChanges();
        expect(label.textContent.trim()).toBe('Uploaded File');
      });
    }));
  });

  it('setTag should return a tag', async () => {
    component.setTag(mockTag);

    expect(component.newBook.tags).toEqual(mockTag);
  });

  it('setAuthor should set newBook author', async () => {
    component.setAuthor(mockAuth);

    expect(component.newBook.author.href).toEqual(mockAuth.href);
    expect(component.newBook.author.id).toEqual(mockAuth.id);
    expect(component.newBook.author.name).toEqual(mockAuth.name);
  });

  it('title property getter should return value set on form', () => {
    component.form.controls.title.setValue('Harry');

    const spy = spyOnProperty(component, 'title').and.callThrough();

    expect(component.title.value).toBe('Harry');
    expect(spy).toHaveBeenCalled();
  });
  it('author property getter should return value set on form', () => {
    component.form.controls.author.setValue('James');

    const spy = spyOnProperty(component, 'author').and.callThrough();

    expect(component.author.value).toBe('James');
    expect(spy).toHaveBeenCalled();
  });
  it('tag property getter should return value set on form', () => {
    component.form.controls.tag.setValue([{
      id: 'HTML',
      href: '/Tags/HTML',
      description: 'HTML',
    }, ]);

    const spy = spyOnProperty(component, 'tag').and.callThrough();
    expect(component.tag.value).toEqual([{
      id: 'HTML',
      href: '/Tags/HTML',
      description: 'HTML',
    }, ]);
    expect(spy).toHaveBeenCalled();
  });
  it('isbn13 property getter should return value set on form', () => {
    component.form.controls.isbn13.setValue('Harry is a writer');

    const spy = spyOnProperty(component, 'isbn13').and.callThrough();

    expect(component.isbn13.value).toBe('Harry is a writer');
    expect(spy).toHaveBeenCalled();
  });
  it('isbn10 property getter should return value set on form', () => {
    component.form.controls.isbn10.setValue('Harry');

    const spy = spyOnProperty(component, 'isbn10').and.callThrough();

    expect(component.isbn10.value).toBe('Harry');
    expect(spy).toHaveBeenCalled();
  });
  it('publisher property getter should return value set on form', () => {
    component.form.controls.publisher.setValue('James');

    const spy = spyOnProperty(component, 'publisher').and.callThrough();

    expect(component.publisher.value).toBe('James');
    expect(spy).toHaveBeenCalled();
  });
  it('dp property getter should return value set on form', () => {
    component.form.controls.dp.setValue('Henry');

    const spy = spyOnProperty(component, 'dp').and.callThrough();

    expect(component.dp.value).toBe('Henry');
    expect(spy).toHaveBeenCalled();
  });
  it('about property getter should return value set on form', () => {
    component.form.controls.about.setValue('Harry is a writer');

    const spy = spyOnProperty(component, 'about').and.callThrough();

    expect(component.about.value).toBe('Harry is a writer');
    expect(spy).toHaveBeenCalled();
  });
  it('filename property getter should return value set on form', () => {
    component.form.controls.filename.setValue('Harry is a writer');

    const spy = spyOnProperty(component, 'filename').and.callThrough();

    expect(component.filename.value).toBe('Harry is a writer');
    expect(spy).toHaveBeenCalled();
  });



});
