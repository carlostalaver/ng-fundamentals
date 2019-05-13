import { Component } from '@angular/core';
import { ToastrService } from './common/toastr.service';

@Component({
  selector: 'events-app',
  template: `<nav-bar></nav-bar>
           <router-outlet></router-outlet>`

})
export class EventsAppComponent {

  constructor( ){
  }
  title = 'ng-fundamentals';
}
