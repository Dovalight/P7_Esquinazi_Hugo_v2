import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { post } from '../../../core/models/Post.model';
import { PostService } from '../../../core/services/post-service';
import { comment } from '../../../core/models/Comment.model';
import { CommentService } from "../../../core/services/comment-service";


@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
Post$!: Observable<post>;
like: string = 'like';
dislike: string = 'dislike';
update: boolean = false;
image: string = '';
file: any;
Comment$!: Observable<comment>;

  constructor(private postServive: PostService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const postId = this.route.snapshot.params['id'];
    this.Post$ = this.postServive.getPostById(postId);
  }

  onModifiedPost(){
    const postId = this.route.snapshot.params['id'];
    this.postServive.modifyPost(postId).subscribe((result)=>
    {
      console.log(result);
      this.router.navigateByUrl('/groupo')
    },
    (error)=>{
      console.log(error);
    });
  }

  onChangeFile(event:any): void{
    let files = Array.from(event.target.files);
    this.file = files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = ()=> {
      this.image = reader.result?.toString()??'';
    };
  }

  onUpdate(){
    this.update = true;
  }

  onDeletePost(){
    const postId = this.route.snapshot.params['id'];
    this.postServive.deletePost(postId).subscribe((result)=>{
      console.log(result);
      this.router.navigateByUrl('/groupo')
    },
    (error)=> {
      console.log(error);
      }
    );
  }

  onLike(postId: string){  
    if(this.like === "like"){
      this.Post$ = this.postServive.likePost(postId, 'like').pipe(
        tap(() => this.like = "liked")
      );
    }else{
      this.Post$ = this.postServive.likePost(postId, 'liked').pipe(
        tap(()=> this.like = "like")
      )
    }
  }

  onDislike(postId: string){
    if(this.dislike === "dislike"){
      this.Post$ = this.postServive.dislikePost(postId, 'dislike').pipe(
        tap(() => this.dislike = "disliked")
      );
    }else{
      this.Post$ = this.postServive.dislikePost(postId, 'disliked').pipe(
        tap(()=> this.dislike = "dislike")
      )
    }
  }

  onComment(){
    console.log('commentaire');
  }
}
