import { Component, Input, OnInit } from '@angular/core';
import { comment as Comment} from '../../../core/models/Comment.model';
import { CommentService } from '../../../core/services/comment-service';
import { post as Post } from "../../../core/models/Post.model";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {

  constructor(private commentService: CommentService) { }

@Input() post : Post = new Post()

  comments: Comment[] = [];

  ngOnInit(): void {
    this.commentService.getAllComments(this.post._id).subscribe((result)=> {
     console.log(result);
    },
    (error)=>{
      console.log(error);
    })
  }
  
}
