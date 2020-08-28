import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component ({
  templateUrl: './signup.component.html'
})

export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;

  constructor() {}

  ngOnInit() {
    // this.authStatusSub = this.authService
    // .getAuthStatusListener()
    // .subscribe(authStatus => {
    //   this.isLoading = false;
    // });
  }

  // onLogin(form: NgForm) {
  //   if (form.invalid) {
  //     return;
  //   }
  //   this.isLoading = true;
  //   // this.authService.login(form.value.email, form.value.password);
  // }


  onSignup(signupForm: NgForm) {

  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
