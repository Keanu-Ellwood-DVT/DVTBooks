import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { ForbiddenComponent } from '../components/forbidden/forbidden.component';
import { AdminComponent } from '../components/admin/admin.component';
import { AdminGuard } from '../shared/guards/admin.guard';
import { BookInfoComponent } from '../components/book-info/book-info.component';
import { HomeComponent } from '../components/home/home.component';
import { SearchResultsListComponent } from '../components/search-results-list/search-results-list.component';
import { AuthorInfoComponent } from '../components/author/author-info/author-info.component';
import { AuthorListComponent } from '../components/author/author-list/author-list.component';

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
    path: 'authors',
    component: AuthorListComponent,
    canActivate: [AdminGuard]
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
