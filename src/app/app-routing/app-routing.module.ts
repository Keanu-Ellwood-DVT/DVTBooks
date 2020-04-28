import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { AuthGuard } from '../auth.guard';
import { ForbiddenComponent } from '../forbidden/forbidden.component';
import { AdminComponent } from '../admin/admin.component';
import { AdminGuard } from '../admin.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
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
    // ,
    // data: {permittedRoles: ["admin"]}
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
