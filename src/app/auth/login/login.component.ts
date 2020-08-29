import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component ({
  templateUrl: './login.component.html'
})

export class LoginComponent  {
  isLoading = false;
 constructor(public authService: AuthService) {}

  onLogin(form: NgForm) {
      if(form.invalid) {
        return;
      }
      this.authService.login(form.value.email, form.value.password)
  }


}