import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component ({
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {
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

  onLogin(form: NgForm) {
      console.log(form.value);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
