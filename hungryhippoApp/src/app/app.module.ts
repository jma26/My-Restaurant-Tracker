import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

// Services
import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';

import { AgmCoreModule } from '@agm/core';


import { AppComponent } from './app.component';
import { LoginRegistrationComponent } from './login-registration/login-registration.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: '', component: LoginRegistrationComponent },
  { path: 'home/:fullname', component: HomeComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginRegistrationComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCFDzK21ltulX-A1BxEJgUsrYdrYiPf5gw'
    })
  ],
  providers: [LoginService, RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }