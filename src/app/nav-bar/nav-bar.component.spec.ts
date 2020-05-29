import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavBarComponent } from './nav-bar.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let bookCheck;
  let authorCheck;

  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      providers: [{ provide: Router, useValue: router }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with query as empty', () => {
    expect(component.query).toEqual('');
  });

  describe('navigateToResults()', () => {
    it('should route to /results with no query and cat = All', () => {
      component.navigateToResults();
      expect(router.navigate).toHaveBeenCalledWith([`/results`, { cat: 'All' }]);
    });

    it('should route to /results with a query and cat = All', () => {
      component.query = 'Design';
      component.navigateToResults();
      expect(router.navigate).toHaveBeenCalledWith([`/results`, { q: 'Design', cat: 'All' }]);
    });

    it('should route to /results with no query and cat = Author', () => {
      authorCheck = fixture.debugElement.query(By.css('#AuthorCheck')).nativeElement;
      authorCheck.checked = true;
      component.query = '';
      component.navigateToResults();
      expect(router.navigate).toHaveBeenCalledWith([`/results`, { cat: 'Author' }]);
    });

    it('should route to /results with a query = Jon and cat = Author', () => {
      authorCheck = fixture.debugElement.query(By.css('#AuthorCheck')).nativeElement;
      authorCheck.checked = true;
      component.query = 'Jon';
      component.navigateToResults();
      expect(router.navigate).toHaveBeenCalledWith([`/results`, { q: 'Jon', cat: 'Author' }]);
    });

    it('should route to /results with no query and cat = Book', () => {
      bookCheck = fixture.debugElement.query(By.css('#BookCheck')).nativeElement;
      bookCheck.checked = true;
      component.query = '';
      component.navigateToResults();
      expect(router.navigate).toHaveBeenCalledWith([`/results`, { cat: 'Book' }]);
    });

    it('should route to /results with query = Design and cat = Book', () => {
      bookCheck = fixture.debugElement.query(By.css('#BookCheck')).nativeElement;
      bookCheck.checked = true;
      component.query = 'Design';
      component.navigateToResults();
      expect(router.navigate).toHaveBeenCalledWith([`/results`, { q: 'Design', cat: 'Book' }]);
    });
  });

  it('should call onCheckboxChange(e) and htmlStr should update', () => {
    bookCheck = fixture.debugElement.query(By.css('#BookCheck')).nativeElement;
    const result = `<span class="label-icon">Book</span> <span class="caret">&nbsp;</span>`;
    bookCheck.click();
    expect(component.htmlStr).toEqual(result);
  });
});
