import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginGuard } from './login.guard';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { RegesterComponent } from './regester/regester.component';
import { SendMessageComponent } from './send-message/send-message.component';

const routes: Routes = [
{path:'' ,redirectTo:'home' , pathMatch:"full"} ,
{path:'home' ,component:HomeComponent} ,
{path:'login' ,component:LoginComponent} ,
{path:'regester' ,component:RegesterComponent} , 


// canActivate:[LoginGuard]

{path:'profile' ,component:ProfileComponent , } , 

{path:'sendMessage/:id' ,component:SendMessageComponent} , 


{path:'**' ,component:NotFoundComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes ,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
