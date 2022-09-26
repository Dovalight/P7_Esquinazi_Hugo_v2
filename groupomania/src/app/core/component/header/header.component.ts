import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userId: string = '' ;
  connected: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId')?? ''
    const modo = JSON.parse(sessionStorage.getItem("moderator")?? 'false')
    this.connected = this.userId || modo
  }

 onDisconnect(){
  sessionStorage.clear();
 }

}
