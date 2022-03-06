import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isLogin = true;
  constructor() { }

  ngOnInit(): void {
  }
  changeIsLogin(){
    console.log('dadsad');
    this.isLogin = !this.isLogin;
  }
}
