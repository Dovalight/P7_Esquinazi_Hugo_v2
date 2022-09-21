import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {post as Post} from '../../../core/models/Post.model';
import { PostService } from '../../../core/services/post-service';

@Component({
  selector: 'app-main-post',
  templateUrl: './main-post.component.html',
  styleUrls: ['./main-post.component.scss']
})
export class MainPostComponent implements OnInit {

@Input() post: Post = new Post;

  constructor(private postServive: PostService,
    private router: Router) { }

  ngOnInit(): void {

  }

  onComment(){
    this.router.navigateByUrl(`groupo/${this.post._id}`);
  }

}
