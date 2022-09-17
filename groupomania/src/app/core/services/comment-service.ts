import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { comment } from "../models/Comment.model";


@Injectable({
    providedIn:'root'
})
export class CommentService{
    constructor(private http: HttpClient){ }

    getAllComments(): Observable<comment[]>{
        const token = sessionStorage.getItem('token');
        const newHeader = new HttpHeaders().set('Authorization', 'Bearer '+ token);
        return this.http.get<comment[]>('http://localhost:3000/api/:post/comment', {headers: newHeader});
    }

    addComment(formValue: comment): Observable<any>{
        const token = sessionStorage.getItem('token');
        const newHeader = new HttpHeaders().set('Authorization', 'Bearer '+ token);
        const comment: comment = {
          ...formValue
        };
        return this.http.post('http://localhost:3000/api/:post/comment', comment, {headers: newHeader});
      }

      modifyComment(commentId: string):Observable<comment>{
        const token = sessionStorage.getItem('token');
        const newHeader = new HttpHeaders().set('Authorization', 'Bearer '+ token);
        return this.http.put<comment>(`http://localhost:3000/api/:post/comment/${commentId}`, {headers: newHeader})
      }

      deleteComment(commentId: string){
        const token = sessionStorage.getItem('token');
        const newHeader = new HttpHeaders().set('Authorization', 'Bearer '+ token);
        return this.http.delete<comment>(`http://localhost:3000/api/:post/comment/${commentId}`, {headers: newHeader})
      }

}