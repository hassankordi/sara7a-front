import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsersService } from '../users.service';



@Component({
  selector: 'app-regester',
  templateUrl: './regester.component.html',
  styleUrls: ['./regester.component.scss']
})
export class RegesterComponent implements OnInit {

  
 

  userData =new FormGroup({
    name: new FormControl("" ,[Validators.required ,Validators.min(3) ]) ,
    email: new FormControl("" ,[Validators.required]) ,
    phone: new FormControl("" ,[Validators.required ,Validators.pattern(/^(010|011|015|012)[0-9]{8}$/)]) ,
    password: new FormControl("" ,[Validators.required ,Validators.min(8)]) ,
    confirmPassword: new FormControl("" ,[Validators.required ,Validators.min(8)]) ,
    age: new FormControl("" ,[Validators.required]) ,
    address: new FormControl("" ,[]) ,

  })

  message: any;
 
  sendData() {
    
    // console.log(this.userData.value);

    this._UserService.regester(this.userData.value).subscribe((result) => {
      // console.log(result);
      this.message = result.msg;
      

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

      this._Router.navigate(['/regester'])

    }
  }

}
