import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  {path: 'groupo', loadChildren: ()=> import ('./post/post.module').then(m => m.PostModule) },
  //{path: 'auth', loadChildren: ()=> import ('./auth/auth.module').then(m => m.AuthModule)},
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
