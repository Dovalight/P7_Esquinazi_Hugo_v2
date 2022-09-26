import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { comment as Comment } from "../../../core/models/Comment.model";
import { post as Post } from '../../../core/models/Post.model';
import { CommentService } from '../../../core/services/comment-service';

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
    private router: Router) { }

  ngOnInit(): void {

  }

  onDeleteComm(){
    this.commentService.deleteComment(this.post._id, this.comment._id).subscribe((result)=>{
      this.router.navigateByUrl('groupo')
    },
    (error)=>{
      console.log(error)
    });
  }

  onUpdate(){
    this.update = true;
  }

  onModifiedComment(){
    this.commentService.modifyComment(this.post._id, this.comment._id, this.comment).subscribe((result)=>{
      this.router.navigateByUrl('groupo')
    },
    (error)=>{
      console.log(error)
    })
  }

}
