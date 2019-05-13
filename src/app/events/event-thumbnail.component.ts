import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IEvent } from './shared';


@Component({
  selector: 'event-thumbnail',
  template: `<div class="well hoverell thumbnail" [routerLink]="['/events', event.id]">
                <h2>{{event?.name}}</h2>
                <div>Date: {{event?.date}}</div>

                 <!--USANDO UN NGSWITCH EN LA PLANTILLA-->
                <div [ngSwitch]="event?.time" [ngClass]= "getStartTimeClass()">
                    Time: {{event?.time}}
                  <span *ngSwitchCase ="'8:00 am'"  >Early Start</span>
                  <span *ngSwitchCase ="'10:00 am'">Late Start</span>
                  <span *ngSwitchDefault >Norma Start</span>
                </div>

                <div [ngStyle]= "{'color': event?.time === '9:00 am' ? 'blue': 'red'}">Price: {{event?.price}}</div>
                <div *ngIf="event?.location">
                  <span>Location: {{event?.location?.address}}</span>
                  <span class="pad-left"> {{event?.location?.city}}, {{event?.location?.country}}</span>
                </div>
                <div  *ngIf="event?.onlineUrl">
                    Online Url: {{event?.onlineUrl}}
                </div>
                <button class="btn btn-primary" (click)="handleClickMe()">Click!</button>
              </div>`,
  styles: [`
  .green { color: #003300 !important;}
  .bold {font-weight: bold;}
    .thumbnail { min-height: 210px;}
    .pad-left {margin-left: 10px;}
    .well div {color: #bbb;}
  `]

})
export class EventThumbnailComponent {
  /* OJO ver como se aplican los style usando ngClass y ngStyle */
  @Input() event: IEvent;
  @Output() eventClick = new EventEmitter();
  someProperty: any = 'Contenedor';


  handleClickMe(): void {
    console.log('haciendo click');
    this.eventClick.emit({
      a: 1,
      b: 2,
      c: 3
    });
  }

  logFoo(): void {
    console.log('llamando al metodo logFoo');
  }


  getStartTimeClass() {

    if (this.event && this.event.time === '8:00 am') {
      return ['green', 'bold'];
    }
    return [];


  }
}
