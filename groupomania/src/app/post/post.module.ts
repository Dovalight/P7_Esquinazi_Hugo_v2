import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPostComponent } from './components/main-post/main-post.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { SinglePostComponent } from './components/single-post/single-post.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostRoutingModule } from './post-routing.module';



@NgModule({
  declarations: [
    MainPostComponent,
    PostListComponent,
    SinglePostComponent,
    NewPostComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PostRoutingModule
  ],
  exports: [
    MainPostComponent,
    PostListComponent,
    SinglePostComponent,
    NewPostComponent
  ]
})
export class PostModule { }
