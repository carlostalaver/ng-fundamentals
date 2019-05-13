import { Component, forwardRef, Inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Component({
templateUrl: './login.component.html',
styles: [`em {float: right; color: #E05C65; padding-left:10px}`]
})
export class LoginComponent {
  mouseOverLogin = false;
  /* declaro estas variables que son las que se definen en cada ngModel porque
   de lo contrario Angular arrojará error en modo produccion. npm start -- -- prod      */
  userName;
  password;

  constructor(@Inject(forwardRef(() => AuthService)) public authService: AuthService,
    @Inject(forwardRef(() => Router)) public route: Router) { }

  login(loginForm) {
    this.authService.loginUser(loginForm.value.userName, loginForm.value.password);
    this.route.navigate(['events']);
  }

  cancel() {
    this.route.navigate(['events']);
  }
}
