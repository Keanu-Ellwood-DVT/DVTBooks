import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminComponent } from './admin/admin.component';
import { AdminDeleteComponent } from './admin/admin-delete/admin-delete.component';
import { AdminUpdateComponent } from './admin/admin-update/admin-update.component';
import { HomeComponent } from './home/home.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResultsComponent } from './results/results.component';
import { BookInfoComponent } from './book-info/book-info.component';
import { NewBookComponent } from './admin/new-book/new-book.component';
import { NewAuthorComponent } from './admin/new-author/new-author.component';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProfileComponent,
    ForbiddenComponent,
    AdminComponent,
    AdminDeleteComponent,
    AdminUpdateComponent,
    HomeComponent,
    SpinnerComponent,
    ResultsComponent,
    BookInfoComponent,
    NewBookComponent,
    NewAuthorComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
