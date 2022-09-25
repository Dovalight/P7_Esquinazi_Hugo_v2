import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { comment as Comment } from "../core/models/Comment.model";
import { post as Post } from '../core/models/Post.model';
import { CommentService } from '../core/services/comment-service';

@Component({
  selector: 'app-main-comment',
  templateUrl: './main-comment.component.html',
  styleUrls: ['./main-comment.component.scss']
})
export class MainCommentComponent implements OnInit {
  
  userId!: string;
  Comment!: string;
  update: boolean = false;

@Input() comment!: Comment;
@Input() post : Post = new Post()

  constructor(private commentService: CommentService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

  }

  onDeleteComm(){
    const commentId = this.route.snapshot.params['id'];
    this.commentService.getCommentById(this.post._id, commentId).subscribe((result)=>{
      console.log(result);
    },
    (error)=>{
      console.log(error)
    });
  }

  onUpdate(){
    this.update = true;
  }

  onModifiedComment(){
    const commentBody = new FormData()
    commentBody.append("comment", this.comment.comment)
    const commentId = this.route.snapshot.params['id'];
    this.commentService.modifyComment(this.post._id, commentId).subscribe((result)=>{
      console.log(result);
    },
    (error)=>{
      console.log(error)
    })
  }

}
