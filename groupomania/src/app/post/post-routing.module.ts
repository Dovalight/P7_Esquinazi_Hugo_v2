import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostListComponent } from "./components/post-list/post-list.component";
import { SinglePostComponent } from "./components/single-post/single-post.component";
import { NewPostComponent } from "./components/new-post/new-post.component";
import { AuthGuard } from "../core/guards/auth.guard";

const routes : Routes = [
    {path: 'new', component: NewPostComponent, canActivate: [AuthGuard]},
    {path: ':id', component: SinglePostComponent, canActivate: [AuthGuard]},
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