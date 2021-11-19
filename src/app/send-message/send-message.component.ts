import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent implements OnInit {
  

  name: any = 'the user name';
  id:any ='';
  message:any= '';
  content:boolean = false;

  formArea = new FormGroup({
    content: new FormControl('' , [Validators.min(3) ,Validators.required])
  })

  onSend(){
    // console.log(this.id);
    // console.log(this.formArea);
    const content = (document.getElementById('messageArea')as HTMLInputElement).value ;
    this._UserService.sendMessage(this.id , this.formArea.value).subscribe((result)=>{
      this.message = result.msg ;
      (document.getElementById('messageArea')as HTMLInputElement).value = ''

      // setTimeout()
      
   setTimeout(()=>{
    this.message = ''

  },3000)
    },(err)=>{console.log(err);
    })
    
   
  }
  constructor(private route: ActivatedRoute, private _UserService: UsersService, private _Router: Router ) {
    const id: string = route.snapshot.params.id;
    this.id = id
    // console.log(id); 
    // alert(id)
    this._UserService.catchTheReceiver(id).subscribe((result) => {
      
      // console.log(result);

      if(result.user){
        this.name = result.user.name
        

      }else{
        alert('invalid-link')
        this._Router.navigate(['/home'])
      }
    }, (err) => {
      console.log(err);
      this._Router.navigate(['/home'])
    })
  }

  ngOnInit(): void {
  }

}
