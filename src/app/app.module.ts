import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegesterComponent } from './regester/regester.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';

import {  HttpClientModule } from '@angular/common/http';
import { SendMessageComponent } from './send-message/send-message.component';
import { ClipboardModule } from "@angular/cdk/clipboard";
// import { Router } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegesterComponent,
    NotFoundComponent,
    ProfileComponent,
    SendMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule , 
    ReactiveFormsModule ,

    HttpClientModule, 

    ClipboardModule
    // Router
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
