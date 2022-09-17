import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable} from "@angular/core";
import { map, Observable, switchMap } from "rxjs";
import { post } from "../models/Post.model";

@Injectable({
    providedIn:'root'
})
export class PostService{

  constructor(private http: HttpClient){ }

    getAllPostes(): Observable<post[]>{
      const token = sessionStorage.getItem('token');
      const newHeader = new HttpHeaders().set('Authorization', 'Bearer '+ token);
      return this.http.get<post[]>('http://localhost:3000/api/publication', {headers: newHeader});
    }

    getPostById(postId: string): Observable<post> {
      const token = sessionStorage.getItem('token');
      const newHeader = new HttpHeaders().set('Authorization', 'Bearer '+ token);
      return this.http.get<post>(`http://localhost:3000/api/publication/${postId}`, {headers: newHeader})
    }

    addPost(formValue: post): Observable<any>{
      const token = sessionStorage.getItem('token');
      const newHeader = new HttpHeaders().set('Authorization', 'Bearer '+ token);
      const post: post = {
        ...formValue,
        likes: 0,
        dislikes:0,
        userLiked:[], 
        userDisliked:[]
      };
      return this.http.post('http://localhost:3000/api/publication', post, {headers: newHeader});
    }

    modifyPost(postId: string): Observable<post>{
      const token = sessionStorage.getItem('token');
      const newHeader = new HttpHeaders().set('Authorization', 'Bearer '+ token);
      return this.getPostById(postId).pipe(
        map(post => ({
          ...post
        })),
        switchMap(updatedPost => this.http.put<post>(`http://localhost:3000/api/publication/${postId}`, updatedPost, {headers: newHeader}))
      )
    }

    deletePost(postId: string): Observable<any>{
      const token = sessionStorage.getItem('token');
      const newHeader = new HttpHeaders().set('Authorization', 'Bearer '+ token);
      return this.http.delete<post>(`http://localhost:3000/api/publication/${postId}`, {headers: newHeader})
    }

    likePost(postId: string, likeType: 'like' | 'liked'): Observable<post> {
      
      return this.getPostById(postId).pipe(
        map(post => ({
          ...post,
          likes: post.likes + (likeType === 'like' ? 1 : -1)
        })),
        switchMap(updatedPost => this.http.put<post>(`http://localhost:3000/api/publication/${postId}`, updatedPost,))
      );
    }

    dislikePost(postId: string, dislikeType: 'dislike' | 'disliked'): Observable<post> {
      const token = sessionStorage.getItem('token');
      const newHeader = new HttpHeaders().set('Authorization', 'Bearer '+ token);
      return this.getPostById(postId).pipe(
        map(post => ({
          ...post,
          dislikes: post.dislikes + (dislikeType === 'dislike' ? 1 : -1)
        })),
        switchMap(updatedPost => this.http.put<post>(`http://localhost:3000/api/publication/${postId}`, updatedPost, {headers: newHeader} ))
      );
    }
}