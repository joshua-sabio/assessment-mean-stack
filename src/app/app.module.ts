import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FormComponent } from './home/form/form.component';
import { UserListComponent } from './user-list/user-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContactDetailComponent } from './user-list/contact-detail/contact-detail.component';
import { HomeComponent } from './home/home.component';
import { DataService } from './data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { LoginComponent } from './home/login/login.component';
import { HeaderComponent } from './header/header.component';
import { RegistrationComponent } from './home/registration/registration.component';
import { AuthService } from './home/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    UserListComponent,
    NotFoundComponent,
    ContactDetailComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule

  ],
  providers: [DataService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
