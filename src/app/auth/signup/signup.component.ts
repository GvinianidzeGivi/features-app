import { AuthService } from './../auth.service';
import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component ({
  templateUrl: './signup.component.html'
})

export class SignupComponent {

  constructor(public authService: AuthService) {}

  onSignup(signupForm: NgForm) {
    if (signupForm.invalid) {
      return;
    }
    this.authService.createUser(signupForm.value.email, signupForm.value.password)
  }
}
