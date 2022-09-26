import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostListComponent } from "./components/post-list/post-list.component";
import { SinglePostComponent } from "./components/single-post/single-post.component";
import { NewPostComponent } from "./components/new-post/new-post.component";

const routes : Routes = [
    {path: 'new', component: NewPostComponent},
    {path: ':id', component: SinglePostComponent},
    {path: '', component: PostListComponent},
    
]

 @NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
 })
 export class PostRoutingModule{}