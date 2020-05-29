import { Tag } from './../../../models/tag';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewBookComponent } from './new-book.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgbModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';
import { Author } from 'src/models/author';

describe('NewBookComponent', () => {
  let component: NewBookComponent;
  let fixture: ComponentFixture<NewBookComponent>;
  let imageNameSubscription: BehaviorSubject<string>;
  let httpTestingController: HttpTestingController;
  let de: DebugElement;
  let el: HTMLElement;
  const testModel: NgbDateStruct = {
    year: 2015,
    month: 1,
    day: 11
  };
  const dpKey = 'dp';
  const publisherKey = 'publisher';
  const isbn13Key = 'isbn13';
  const titleKey = 'title';
  const testTag = [
    {
      id: 'Redux',
      href: '/Tags/Redux',
      description: 'Redux'
    }
  ];
  const testAuth: Author = {
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewBookComponent],
      imports: [HttpClientTestingModule, FormsModule, RouterModule.forRoot([]), ReactiveFormsModule, NgbModule, BrowserModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
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

    httpTestingController = TestBed.inject(HttpTestingController);
    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
    imageNameSubscription = new BehaviorSubject<string>('');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set submitted to true', async () => {
    component.form.controls[dpKey].setValue({
      year: '2015',
      month: '1',
      day: '11'
    });
    component.addBook();
    expect(component.submitted).toBeTruthy();
  });

  it('should call the addBook method', async () => {
    spyOn(component, 'addBook');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.addBook).toHaveBeenCalledTimes(0);
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
    component.form.controls[dpKey].setValue(testModel);
    expect(component.form.valid).toBeTruthy();
  });

  it('unsubscribes when destroyed', () => {
    fixture.detectChanges();
    const imageNameSubscriptionSpy = spyOn(imageNameSubscription, 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(imageNameSubscriptionSpy).not.toHaveBeenCalled();
  });

  it('should call the uploadPicture method', async () => {
    spyOn(component, 'uploadPicture');
    el = fixture.debugElement.query(By.css('input')).nativeElement;
    el.click();
    expect(component.uploadPicture).toHaveBeenCalledTimes(0);
  });

  it('changeTag should return a tag', async () => {
    component.changeTag(testTag);

    expect(component.newBook.tags).toEqual(testTag);
  });

  it('changeAuth should set newBook author', async () => {
    component.changeAuth(testAuth);

    expect(component.newBook.author.href).toEqual(testAuth.href);
    expect(component.newBook.author.id).toEqual(testAuth.id);
    expect(component.newBook.author.name).toEqual(testAuth.name);
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
