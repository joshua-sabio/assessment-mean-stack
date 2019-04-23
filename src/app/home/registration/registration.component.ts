import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';

import { AuthService } from '../auth.service'
import { User } from '../user.model';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent {

  constructor(private authService: AuthService) {}


  onRegister(form: NgForm)  {
    const user: User = form.value;
    this.authService.registerUser(user).subscribe()
  }
}