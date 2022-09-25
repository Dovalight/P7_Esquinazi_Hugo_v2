import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { comment } from "../models/Comment.model";


@Injectable({
    providedIn:'root'
})
export class CommentService{

  comments: comment[] = []

    
    constructor(private http: HttpClient){ }

    getAllComments(postId: string): Observable<comment[]>{
        const token = sessionStorage.getItem('token');
        const newHeader = new HttpHeaders().set('Authorization', 'Bearer '+ token);
        return this.http.get<comment[]>(`http://localhost:3000/api/publication/${postId}/comment`, {headers: newHeader});
    }

    getCommentById(postId: string, commentId: string): Observable<comment> {
      const token = sessionStorage.getItem('token');
      const newHeader = new HttpHeaders().set('Authorization', 'Bearer '+ token);
      return this.http.get<comment>(`http://localhost:3000/api/publication/${postId}/comment/${commentId}`, {headers: newHeader})
    }

    addComment(postId: string, formValue: any): Observable<any>{
        const token = sessionStorage.getItem('token');
        const newHeader = new HttpHeaders().set('Authorization', 'Bearer '+ token);
        return this.http.post(`http://localhost:3000/api/publication/${postId}/comment`, formValue, {headers: newHeader});
      }

      modifyComment(postId: string, commentId: string):Observable<comment>{
        const token = sessionStorage.getItem('token');
        const newHeader = new HttpHeaders().set('Authorization', 'Bearer '+ token);
        return this.http.put<comment>(`http://localhost:3000/api/publication/${postId}/comment/${commentId}`, {headers: newHeader})
      }

      deleteComment(postId: string, commentId: string){
        const token = sessionStorage.getItem('token');
        const newHeader = new HttpHeaders().set('Authorization', 'Bearer '+ token);
        return this.http.delete<comment>(`http://localhost:3000/api/publication/${postId}/comment/${commentId}`, {headers: newHeader})
      }

}