import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../../core/services/auth-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  userEmail!: string;
  userPassword!: string;

  constructor(private router: Router,
    private service: AuthService) { }

  ngOnInit(): void {
  }

  onSignUp(): void{
    console.log(this.userEmail);
    this.service.signUp(this.userEmail, this.userPassword).subscribe(
      (result)=>{
        console.log(result);
        sessionStorage.setItem("userId", result.userId)
        this.router.navigateByUrl('/groupo');
    },
    (error)=>{
      console.log(error);
    })
  }
}
