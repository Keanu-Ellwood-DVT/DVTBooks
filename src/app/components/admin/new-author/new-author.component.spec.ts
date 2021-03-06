import { Author } from '../../../shared/models/author';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { NewAuthorComponent } from './new-author.component';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { AuthorService } from 'src/app/shared/services/author.service';

describe('NewAuthorComponent', () => {
  let component: NewAuthorComponent;
  let fixture: ComponentFixture<NewAuthorComponent>;
  let httpTestingController: HttpTestingController;
  let de: DebugElement;
  let el: HTMLElement;
  const firstNameKey = 'firstName';
  const lastNameKey = 'lastName';
  let spyAuthorService: AuthorService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [NewAuthorComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, BrowserModule]
    });
    fixture = TestBed.createComponent(NewAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyAuthorService = TestBed.inject(AuthorService);
    httpTestingController = TestBed.inject(HttpTestingController);
    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAuthor and set newAuthor to return value', () => {
    component.state = 'Update';
    component.currentAuth = mockAuthor;
    spyOn(spyAuthorService, 'getAuthor').and.returnValue(of(mockAuthor));
    component.ngOnInit();
    expect(component.newAuthor).toEqual(mockAuthor);
    expect(component).toBeTruthy();
  });

  it('should call putAuthor', () => {
    component.state = 'Update';
    const spy = spyOn(spyAuthorService, 'putAuthor');
    const input = fixture.debugElement.query(By.css('#addAuthorBtn'));
    input.triggerEventHandler('click', null);
    expect(spy).toHaveBeenCalled();
  });

  it('should call the addAuthor method', fakeAsync(() => {
    const onClickSpy = spyOn(component, 'addAuthor');
    const input = fixture.debugElement.query(By.css('#addAuthorBtn'));
    input.triggerEventHandler('click', null);
    expect(onClickSpy).toHaveBeenCalled();
  }));

  it('form should be valid if required values are set', async () => {
    component.form.controls[firstNameKey].setValue('Peter');
    component.form.controls[lastNameKey].setValue('Piper');
    expect(component.form.valid).toBeTruthy();
  });

  it('form should be invalid if required values are not set', async () => {
    component.form.controls[firstNameKey].setValue('');
    component.form.controls[lastNameKey].setValue('');
    expect(component.form.valid).toBeFalsy();
  });

  it('form should return correct values', async () => {
    component.form.controls.firstName.setValue('Harry');
    component.form.controls.middleName.setValue('Henry');
    component.form.controls.lastName.setValue('Henrison');
    component.form.controls.about.setValue('A human');
    fixture.detectChanges();
    expect(component.form.controls.firstName.value).toEqual('Harry');
    expect(component.form.controls.middleName.value).toEqual('Henry');
    expect(component.form.controls.lastName.value).toEqual('Henrison');
    expect(component.form.controls.about.value).toEqual('A human');
  });

  it('firstName property getter should return value set on form', () => {
    component.form.controls.firstName.setValue('Harry');
    const spy = spyOnProperty(component, 'firstName').and.callThrough();
    expect(component.firstName.value).toBe('Harry');
    expect(spy).toHaveBeenCalled();
  });

  it('middleName property getter should return value set on form', () => {
    component.form.controls.middleName.setValue('James');
    const spy = spyOnProperty(component, 'middleName').and.callThrough();
    expect(component.middleName.value).toBe('James');
    expect(spy).toHaveBeenCalled();
  });

  it('lastName property getter should return value set on form', () => {
    component.form.controls.lastName.setValue('Henry');
    const spy = spyOnProperty(component, 'lastName').and.callThrough();
    expect(component.lastName.value).toBe('Henry');
    expect(spy).toHaveBeenCalled();
  });

  it('about property getter should return value set on form', () => {
    component.form.controls.about.setValue('Harry is a writer');
    const spy = spyOnProperty(component, 'about').and.callThrough();
    expect(component.about.value).toBe('Harry is a writer');
    expect(spy).toHaveBeenCalled();
  });

  it('should call putAuthor when state !== "Update"', () => {
    const spyPutAuthor = spyOn(spyAuthorService, 'putAuthor');
    const input = fixture.debugElement.query(By.css('#addAuthorBtn'));
    input.triggerEventHandler('click', null);
    expect(spyPutAuthor).toHaveBeenCalled();
  });

  it('should call putAuthor when state === "Update"', () => {
    component.state = 'Update';
    const spyPutAuthor = spyOn(spyAuthorService, 'putAuthor');
    const input = fixture.debugElement.query(By.css('#addAuthorBtn'));
    input.triggerEventHandler('click', null);
    expect(spyPutAuthor).toHaveBeenCalled();
  });
});

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
      title: '',
      href: 'http://localhost:4201/Books/$9780133966153',
      id: '9780133966153',
      isbn10: '0133966151',
      isbn13: '9780133966153'
    }
  ]
};
