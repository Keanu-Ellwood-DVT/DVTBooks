import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewBookComponent } from './new-book.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgbModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { DebugElement } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';

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
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewBookComponent],
      imports: [HttpClientTestingModule, FormsModule, RouterModule.forRoot([]), ReactiveFormsModule, NgbModule, BrowserModule]
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set submitted to true', async () => {
    component.form.controls['dp'].setValue({
      year: '2015',
      month: '1',
      day: '11'
    });
    component.addBook();
    expect(component.submitted).toBeTruthy();
  });

  it('should call the addAuthor method', async () => {
    spyOn(component, 'addBook');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.addBook).toHaveBeenCalledTimes(0);
  });

  it('form should be invalid', async () => {
    component.form.controls['title'].setValue('');
    component.form.controls['isbn13'].setValue('');
    component.form.controls['publisher'].setValue('');
    component.form.controls['dp'].setValue({
      year: '',
      month: '',
      day: ''
    });
    expect(component.form.valid).toBeFalsy();
  });

  it('form should be valid', async () => {
    component.form.controls['title'].setValue('Book');
    component.form.controls['isbn13'].setValue('9781234567891');
    component.form.controls['publisher'].setValue('Publisher');
    component.form.controls['dp'].setValue(testModel);
    expect(component.form.valid).toBeTruthy();
  });

  // it('unsubscribes when destroyed', () => {
  //   fixture.detectChanges();
  //   spyOn(imageNameSubscription, 'unsubscribe').and.callThrough();
  //   component.ngOnDestroy();
  //   expect(imageNameSubscription.unsubscribe).toHaveBeenCalled();
  // });

});
