import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from "@auth0/angular-jwt";

import { UsersService } from '../users.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userName: any = 'User Name';
  numberOfMessages: any = 20;
  allMessages: any = []
  noMessages: boolean = true;
  id: any = ''
  message: any = ''
  userLink: any = '';

  user:any;

  alertCopyMessag:boolean = false
   copyLink() {
     this.alertCopyMessag = true

   setTimeout(()=>{
     this.alertCopyMessag = false

   },3000)
  }
  deleteMessage(msg: any) {
    for (let i = 0; i < this.allMessages.length; i++) {
      if (this.allMessages[i] == msg) {

        this.allMessages.splice(i, 1)
        
      }
    }
    this.numberOfMessages = this.allMessages.length
    // console.log(msg._id);

    this._UserService.deleteMessage(msg._id).subscribe((res) => {
      this.message = res.msg ;
      this.reFreshMessages(this.user)
    }, (err) => {
      console.log(err);

    })
    
    


  }

  reFreshMessages(user:any){
    const userId = user._id ; 
    // console.log(userId);
    
    this._UserService.getMessages(userId).subscribe((res)=>{
      this.allMessages = res.messages ; 
      // console.log(this.allMessages);
      this.numberOfMessages = this.allMessages.length
      if (this.allMessages.length < 1) {
        this.noMessages = true;
      } else {
        this.noMessages = false;
      }
      
      
    },(err)=>{console.log(err);
    })
   

  }
 
  logOut(){
    this._Router.navigate(['/login'])
    localStorage.removeItem('userToken')
    localStorage.removeItem('messagesToken')
    this._UserService.isLogin =false;
    // console.log("is login is =>"+this._UserService.isLogin);
  }
  // private _Router:Router
  constructor(private _Router: Router, private _UserService: UsersService) {

  }

  ngOnInit(): void {

    const userToken: any = localStorage.getItem('userToken');
    const messagesToken: any = localStorage.getItem('messagesToken');
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(userToken);

    if (userToken &&!isExpired ) {
      const decodedUserToken = helper.decodeToken(userToken);
      // console.log(decodedUserToken);
      this.user = decodedUserToken.user
      this.userName = decodedUserToken.user.name;
      this._UserService.isLogin = true
      // console.log(decodedUserToken.user.name);
      this.id = decodedUserToken.user._id
     
      this.userLink = `https://sara7a-app-hk.netlify.app/#/sendMessage/${this.id}` 
      
      // https://sara7a-app-hk.netlify.app/#/


      

    } else {
      // if there is no user token then router to login

      this._Router.navigate(['/login'])

    }

    if (messagesToken) {
      const decodedMessagesToken = helper.decodeToken(messagesToken);
      // console.log(decodedMessagesToken);
      this.numberOfMessages = decodedMessagesToken.allMessages.length
      this.allMessages = decodedMessagesToken.allMessages 

      this.reFreshMessages(this.user)

      if (this.allMessages.length < 1) {
        this.noMessages = true;
      } else {
        this.noMessages = false;
      }


    }





  }

}
