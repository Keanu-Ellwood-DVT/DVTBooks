import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { ForbiddenComponent } from '../forbidden/forbidden.component';
import { AdminComponent } from '../admin/admin.component';
import { AdminGuard } from '../admin.guard';
import { BookInfoComponent } from '../book-info/book-info.component';
import { HomeComponent } from '../home/home.component';
import { SearchResultsListComponent } from '../search-results-list/search-results-list.component';
import { AuthorInfoComponent } from '../author-info/author-info.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'results',
    component: SearchResultsListComponent
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivate: [AdminGuard],
        component: AdminComponent
      }
    ]
  },
  {
    path: 'book/:isbn',
    component: BookInfoComponent
  },
  {
    path: 'author/:id',
    component: AuthorInfoComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
