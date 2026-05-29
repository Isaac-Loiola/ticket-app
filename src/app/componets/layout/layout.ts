import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

  public user: any;

  constructor(
    private auth: Auth
  ){}
  ngOnInit(){
    this.user = JSON.parse(this.auth.getUser()!);
    console.log(this.user);
  }

  public logout(){
    this.auth.logout();
  }
  
}
