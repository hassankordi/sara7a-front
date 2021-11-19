import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userData = new FormGroup({

    email: new FormControl("", [Validators.required]),

    password: new FormControl("", [Validators.required]),


  })
  message: any;
 
  login() {
    // console.log(this.userData.value);

    this._UserService.login(this.userData.value).subscribe((result) => {
      // console.log(result);
      // console.log(result.userToken);
      // console.log(result.messagesToken);
      this.message = result.msg;
      localStorage.setItem('userToken' ,result.userToken)
      localStorage.setItem('messagesToken' ,result.messagesToken)
      if(this.message =='login success'){
        this._Router.navigate(['/profile'])
        this._UserService.isLogin =true
        // console.log(this._UserService.isLogin);
        


      }
      else{
        this._UserService.isLogin =false

      }

    }, (err) => {
      console.log(err);
    })

  }
  constructor(private _UserService: UsersService , private _Router:Router) { }

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

      this._Router.navigate(['/login'])

    }
  }

}
