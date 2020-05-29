import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BookInfoComponent } from './book-info/book-info.component';
import { NewBookComponent } from './admin/new-book/new-book.component';
import { NewAuthorComponent } from './admin/new-author/new-author.component';
import { SearchResultsListComponent } from './search-results-list/search-results-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthorInfoComponent } from './author-info/author-info.component';
import { AuthorListComponent } from './author-list/author-list.component';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProfileComponent,
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
