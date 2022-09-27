import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private token!: string;

    constructor(private htppClient: HttpClient){

    }

    getToken(): string {
        return this.token;
    }

    logIn(email: string, password: string): Observable<any>{
        this.token = 'faketoken';
        const body = {
            email,
            password
         } 
         return this.htppClient.post(`http://localhost:3000/api/auth/login`, body)
    }

    signUp(email:string, password: string): Observable<any>{
        const body = {
            email, 
            password,
            moderator : false
        }
        return this.htppClient.post(`http://localhost:3000/api/auth/signup`, body)
    }
}