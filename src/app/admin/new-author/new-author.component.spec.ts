import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewAuthorComponent } from './new-author.component';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';

describe('NewAuthorComponent', () => {
  let component: NewAuthorComponent;
  let fixture: ComponentFixture<NewAuthorComponent>;
  let httpTestingController: HttpTestingController;
  let de: DebugElement;
  let el: HTMLElement;
  const firstNameKey = 'firstName';
  const lastNameKey = 'lastName';
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [ NewAuthorComponent ]
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

  it('form should be invalid', async () => {
    component.form.controls[firstNameKey].setValue('');
    component.form.controls[lastNameKey].setValue('');
    expect(component.form.valid).toBeFalsy();
  });

  it('form should be valid', async () => {
    component.form.controls[firstNameKey].setValue('Peter');
    component.form.controls[lastNameKey].setValue('Piper');
    expect(component.form.valid).toBeTruthy();
  });
});
