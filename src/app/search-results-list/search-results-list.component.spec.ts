import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsListComponent } from './search-results-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

describe('SearchResultsListComponent', () => {
  let component: SearchResultsListComponent;
  let fixture: ComponentFixture<SearchResultsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, RouterModule.forRoot([]), ReactiveFormsModule],
      declarations: [ SearchResultsListComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsListComponent);
    component = fixture.componentInstance;
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
});
