import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BookInfoComponent } from './components/book-info/book-info.component';
import { NewBookComponent } from './components/admin/new-book/new-book.component';
import { NewAuthorComponent } from './components/admin/new-author/new-author.component';
import { SearchResultsListComponent } from './components/search-results-list/search-results-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthorInfoComponent } from './components/author/author-info/author-info.component';
import { AuthorListComponent } from './components/author/author-list/author-list.component';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ForbiddenComponent,
    AdminComponent,
    HomeComponent,
    SpinnerComponent,
    BookInfoComponent,
    NewBookComponent,
    NewAuthorComponent,
    SearchResultsListComponent,
    AuthorInfoComponent,
    AuthorListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgbModule
  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
