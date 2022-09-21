import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { post as Post } from '../../../core/models/Post.model';
import { comment as Comment} from 'src/app/core/models/Comment.model';
import { PostService } from '../../../core/services/post-service';
import { CommentService } from 'src/app/core/services/comment-service';


@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
post!: Post;
like: string = 'like';
dislike!: string;
update: boolean = false;
image: string = '';
file: any;

comment!: Comment; 
addComment: boolean = false;

  constructor(private postServive: PostService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const postId = this.route.snapshot.params['id'];
    this.postServive.getPostById(postId).subscribe((result)=>{
      this.post = result
    },
    (error)=>{
      console.log(error);
    });
  }

  onModifiedPost(){
    const body = new FormData();
    body.append('name', this.post.name);
    body.append('post', this.post.post);
    body.append('image', this.file);
    const postId = this.route.snapshot.params['id'];
    this.postServive.modifyPost(postId, body).subscribe((result)=>
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
    const userId = sessionStorage.getItem('userId')?? ''
    const like = this.post.userLiked ? this.post.userLiked.includes(userId) ? 0:1 : 1
    this.postServive.likePost(postId, userId, like).subscribe((result) =>{
      console.log(result);
      if (like === 0){
        this.post.likes = this.post.likes - 1
        this.post.userLiked.splice(this.post.userLiked.findIndex(x => x === userId), 1)  
      } else {
        this.post.likes = this.post.likes +1
        if(this.post.userLiked){
          this.post.userLiked.push(userId)
        }else{
          this.post.userLiked = [userId]
        }
      }
      this.like = this.post.likes > 0 ? 'liked' : 'like'
    },
    (error)=> {
      console.log(error)
    });
  }

  onDislike(postId: string){
    const userId = sessionStorage.getItem('userId')?? ''
    const dislike = this.post.userDisliked ? this.post.userDisliked.includes(userId) ? 0:1 : 1
    this.postServive.dislikePost(postId, userId, dislike).subscribe((result)=>{
      console.log(result)
      if(dislike === 0){
        this.post.dislikes = this.post.dislikes - 1
        this.post.userDisliked.splice(this.post.userDisliked.findIndex(x => x=== userId), 1)
      } else {
        this.post.dislikes = this.post.dislikes + 1
        if(this.post.userDisliked){
          this.post.userDisliked.push(userId)
        }else {
          this.post.userDisliked = [userId]
        }
      }
      this.dislike = this.post.dislikes > 0 ? 'disliked' : 'dislike'
    }, (error)=>{
      console.log(error)
    });
  }

  

  onComment(){
    this.addComment = true;
  }

  onAddComment(){
    const commentBody = new FormData()
    commentBody.append('userId', sessionStorage.getItem('userId') ?? '')
    commentBody.append('comment', this.comment.comment)
    /*this.commentService.addComment(commentBody).subscribe((result)=>{
      console.log(result);
    },
    (error)=>{
      console.log(error);
    })*/
  }
}
