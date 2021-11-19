import { HttpClient ,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  isLogin:any ;
  

  login(userData:any):Observable <any>{
    const body ={
      
      email :userData.email ,
      password :userData.password ,
      
    }
    // console.log(body);
    
    return this._HttpClient.post('https://sara7a-app.herokuapp.com/login' , body)
  }
  regester(userData:any):Observable <any>{
    const body ={
      name :userData.name , 
      email :userData.email ,
      password :userData.password ,
      confirmPassword :userData.confirmPassword ,
      phone :userData.phone ,
      age :userData.age ,
      address :userData.address ,
      
    }
    // console.log(body);
    
    return this._HttpClient.post('https://sara7a-app.herokuapp.com/regestration' , body)
  }

  getMessages(id:any):Observable<any>{
    return this._HttpClient.get(`https://sara7a-app.herokuapp.com/getMessages/${id}`)
  }

  catchTheReceiver(id:any):Observable<any>{
    const body:any={
      id
    }
    return this._HttpClient.post('https://sara7a-app.herokuapp.com/catchUser',body)
  }
  sendMessage(id:any , data:any):Observable<any>{
   
    // console.log(data.content);
    
    const body:any={
     
      content:data.content
    }
    return this._HttpClient.post(`https://sara7a-app.herokuapp.com/sendMessage/${id}`,body )
  }
  deleteMessage(id:any):Observable<any>{
    const body = {
      id

    }
    return this._HttpClient.post(`https://sara7a-app.herokuapp.com/deleteMessage`,body )
  }
  constructor(private _HttpClient:HttpClient ) { 
    
  }
  ngOnInit(): void {
    
    const userToken: any = localStorage.getItem('userToken');
    
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(userToken);

    if (userToken &&!isExpired) {
      const decodedUserToken = helper.decodeToken(userToken);
      // console.log(decodedUserToken);
      
      this.isLogin =true
     
    
      


     

    } else {
      // if there is no user token then router to login
      this.isLogin =false

      // this._Router.navigate(['/regester'])

    }
  }
}
