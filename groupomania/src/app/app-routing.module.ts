import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CommentListComponent } from './comment-list/comment-list.component';

const routes: Routes = [
  {path: 'groupo', loadChildren: ()=> import ('./post/post.module').then(m => m.PostModule) },
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'comment', component: CommentListComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
