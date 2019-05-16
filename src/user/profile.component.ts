import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { IToastr, TOASTR_TOKEN } from 'src/app/common/toastr.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component ({
  templateUrl: './profile.component.html',
  styles: [
    `em {float: right; color: #E05C65; padding-left:10px;}
    .error input { background-color: #E3C3C5;}
    .error ::-webkit-input-placeholder {color: #999;}
    .error ::-moz-placeholder {color: #999;}
    .error :-moz-placeholder {color: #999;}
    .error ::ms-input-placeholder {color: #999;}
    `]
})
export class ProfileComponent implements OnInit {
    profileForm: FormGroup;
    private firstName: FormControl;
    private lastName: FormControl;

  constructor(@Inject(forwardRef(() => AuthService)) private authService: AuthService,
              @Inject(forwardRef(() => Router)) private router: Router,
              @Inject(TOASTR_TOKEN) private toastr: IToastr) {}

  ngOnInit(): void {
     this.firstName = new FormControl(this.authService.currentUser.firstName,
                                 [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z].*')]);
     this.lastName = new FormControl(this.authService.currentUser.lastName, [Validators.required]);

    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    });
    console.log('el formulario  es ', this.profileForm);

  }

  cancel() {
      this.router.navigate(['events']);
  }

  saveProfile(profileValue) {
    if (this.profileForm.valid) {
      this.authService.updateCurrentUser(profileValue.firstName, profileValue.lastName);
      this.toastr.success('Profile saved');
      this.router.navigate(['events']);
     // this.toastr.info ('Profile saved');
    }
  }

  validateLastName() {
   return  this.lastName.valid || this.lastName.untouched;
  }

  validateFirstName() {
    return  this.firstName.valid || this.firstName.untouched;
   }
}
