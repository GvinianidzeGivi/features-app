import { AuthService } from './../auth.service';
import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component ({
  templateUrl: './signup.component.html'
})

export class SignupComponent {

  isLoading = false;
  private authStatusSub: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatus()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(
      form.value.email,
      form.value.password,
      form.value.firstname,
      form.value.lastname
    );
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
