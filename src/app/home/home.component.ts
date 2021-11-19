import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _Router:Router ,private _UserService:UsersService) { 
    // localStorage.removeItem('userToken')
    // localStorage.removeItem('messagesToken')
  }

  ngOnInit(): void {
    const userToken: any = localStorage.getItem('userToken');
    
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(userToken);

    if (userToken &&!isExpired) {
      const decodedUserToken = helper.decodeToken(userToken);
      // console.log(decodedUserToken);
      this._UserService.isLogin = true;
      this._Router.navigate(['/profile'])
    
      


     

    } else {
      // if there is no user token then router to login

      this._Router.navigate(['/home'])

    }

    
  }

}
