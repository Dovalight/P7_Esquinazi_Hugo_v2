import { Component, OnInit } from '@angular/core';
import { comment as Comment} from '../core/models/Comment.model';
import { CommentService } from '../core/services/comment-service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {

  constructor(private commentService: CommentService) { }

  comments!: Comment[];

  ngOnInit(): void {
    this.comments =  this.commentService.getComment();
  }
  
}
