import { Component, forwardRef, Inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Component({
templateUrl: './login.component.html',
styles: [`em {float: right; color: #E05C65; padding-left:10px}`]
})
export class LoginComponent {
  mouseOverLogin: boolean = false;
  userName;
  password;
  constructor(@Inject(forwardRef(() => AuthService)) private authService: AuthService,
  @Inject(forwardRef(() => Router)) private route: Router) {}

  login(loginForm) {
    this.authService.loginUser(loginForm.value.userName, loginForm.value.password );
    this.route.navigate(['events']);
  }

  cancel() {
    this.route.navigate(['events']);
  }
}
