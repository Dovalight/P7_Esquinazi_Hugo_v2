import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { post } from '../../../core/models/Post.model';
import { PostService } from '../../../core/services/post-service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  constructor(private postService: PostService,
    private router: Router) { }

  postes: post[] = [];

  ngOnInit(): void {
   
    this.postService.getAllPostes().subscribe((result)=> {
      this.postes = result
    },
    (error)=> {
      console.log(error)
    });
  }
  onNewPost():void {
    this.router.navigateByUrl('/groupo/new');
  }
}
