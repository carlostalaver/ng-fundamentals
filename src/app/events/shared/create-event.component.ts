import { Component, Inject, forwardRef, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { EventService } from "./event.service";

@Component({
  templateUrl: './create-event.component.html',
  styles: [
    `em {float: right; color: #E05C65; padding-left:10px;}
    .error input { background-color: #E3C3C5;}
    .error ::-webkit-input-placeholder {color: #999;}
    .error ::-moz-placeholder {color: #999;}
    .error :-moz-placeholder {color: #999;}
    .error ::ms-input-placeholder {color: #999;}
    `]
})
export class CreateEventComponent implements OnInit {

    isDirty: boolean = true;
    newEvent;

  constructor(@Inject(forwardRef(() => Router)) private route: Router,
              @Inject(forwardRef(() => EventService)) private eventService: EventService) {

  }
cancel(): void {
  this.route.navigate(['/events']);
}

saveEvent(formValues) {
 this.eventService.saveEvent(formValues);
 this.isDirty = false;
 this.route.navigate(['/events']);

}

ngOnInit(): void {
  this.newEvent= {
    name: 'NG Spectacular',
    date: '8/8/18',
    time: '10:00 am',
    price: 21.00,
    location: {
      address: 'vitacura 2736',
      city: 'Felicity',
      country: 'Chile'
    },
    onlineUrl: 'http://ngSpectacular.com',
    imageUrl: 'http://ngSpectacular.com/logo.png'
  }
}
}
