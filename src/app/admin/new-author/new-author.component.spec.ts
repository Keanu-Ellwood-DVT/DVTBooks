import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewAuthorComponent } from './new-author.component';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';

describe('NewAuthorComponent', () => {
  let component: NewAuthorComponent;
  let fixture: ComponentFixture<NewAuthorComponent>;
  let httpTestingController: HttpTestingController;
  let de: DebugElement;
  let el: HTMLElement;
  const firstNameKey = 'firstName';
  const lastNameKey = 'lastName';
  const middleNameKey = 'middleName';
  const aboutKey = 'about';
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

    httpTestingController = TestBed.inject(HttpTestingController);
    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set submitted to true', async () => {
    component.addAuthor();
    expect(component.submitted).toBeTruthy();
  });

  it('should call the addAuthor method', async () => {
    spyOn(component, 'addAuthor');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.addAuthor).toHaveBeenCalledTimes(0);
  });

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
});
