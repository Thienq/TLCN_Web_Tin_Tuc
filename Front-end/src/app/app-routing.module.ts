import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import {RouterModule, Routes } from '@angular/router';
import { FramesComponent } from './frames/frames.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { PasswordEditComponent } from './password-edit/password-edit.component';
import { NewsManagementComponent } from './news-management/news-management.component';
import { NewsTypingComponent } from './news-typing/news-typing.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { NewsIndexComponent } from './news-index/news-index.component';
import { from } from 'rxjs';
import { UserManagementComponent } from './user-management/user-management.component';

const routes: Routes = [
  { path: '', component: FramesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recoverypassword', component: ResetpasswordComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'editprofile', component: ProfileEditComponent },
  { path: 'editpassword', component: PasswordEditComponent },
  { path: 'newsmanagement', component: NewsManagementComponent },
  { path: 'newstyping', component: NewsTypingComponent },
  { path: 'newsdetail', component: NewsDetailComponent },
  { path: 'news', component: NewsIndexComponent },
  { path: 'usersmanagement', component: UserManagementComponent }
];

@NgModule({
  imports: [
    // CommonModule
    RouterModule.forRoot(routes)
  ],
//  declarations: []
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
