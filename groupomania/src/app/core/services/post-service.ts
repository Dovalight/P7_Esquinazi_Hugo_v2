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

    addPost(formValue: any): Observable<any>{
      const token = sessionStorage.getItem('token');
      const newHeader = new HttpHeaders().set('Authorization', 'Bearer '+ token);
      return this.http.post('http://localhost:3000/api/publication', formValue, {headers: newHeader});
    }

    modifyPost(postId: string, updateValue: any): Observable<post>{
      const token = sessionStorage.getItem('token');
      const newHeader = new HttpHeaders().set('Authorization', 'Bearer '+ token);
      return this.http.put<post>(`http://localhost:3000/api/publication/${postId}`, updateValue, {headers: newHeader})
    }

    deletePost(postId: string): Observable<any>{
      const token = sessionStorage.getItem('token');
      const newHeader = new HttpHeaders().set('Authorization', 'Bearer '+ token);
      return this.http.delete<post>(`http://localhost:3000/api/publication/${postId}`, {headers: newHeader})
    }

    likePost(postId: string, userId: string, like: number): Observable<post> {
      const token = sessionStorage.getItem('token');
      const newHeader = new HttpHeaders().set('Authorization', 'Bearer '+ token);
      const body = {
        userId,
        like  
      }
      return this.http.post<post>(`http://localhost:3000/api/publication/${postId}/like`, body, {headers: newHeader});
    }

    dislikePost(postId: string, userId: string, dislike: number): Observable<post> {
      const token = sessionStorage.getItem('token');
      const newHeader = new HttpHeaders().set('Authorization', 'Bearer '+ token);
      const body ={
        userId,
        dislike
      }
      return this.http.post<post>(`http://localhost:3000/api/publication/${postId}/like`, body, {headers: newHeader} );
    }
}