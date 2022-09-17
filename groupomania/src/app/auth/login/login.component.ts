import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { AuthService } from '../../core/services/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userEmail!: string ;
  userPassword!: string ;
  

  constructor(private router: Router,
    private service: AuthService) { }

  ngOnInit(): void {
  }

  onLogin(): void{
    console.log(this.userEmail);
    this.service.logIn(this.userEmail, this.userPassword).subscribe(
      (result)=>{
        console.log(result);
        sessionStorage.setItem("userId", result.userId)
        sessionStorage.setItem("token", result.token)
        this.router.navigateByUrl('/groupo');
    },
    (error)=>{
      console.log(error);
    })
  }
}
