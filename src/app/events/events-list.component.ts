import { Component, Inject, forwardRef, OnInit } from '@angular/core';
import { EventService } from './shared/event.service';
import { ToastrService } from '../common/toastr.service';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from './shared';

@Component({
  template: `<div>
                 <h1>Upcoming Angular Events</h1>
                 <hr>
                 <div class="row">
                  <div  class="col-md-5" *ngFor="let event of events">
                   <event-thumbnail (click) = "handleThumbnailClick(event.name)"  [event]='event' #thumbnail
                           (eventClick) = "handleEventClick($event)" >
                   </event-thumbnail>
                      <button class="btn btn-primary" (click) = "thumbnail.logFoo()"> {{thumbnail.someProperty}}</button>
                 </div>
                 </div>
              </div>`

})
export class EventsListComponent implements OnInit {


  // tslint:disable-next-line:max-line-length
  events: IEvent[]; //trabajaria con este que es un ARRAY sino lo estuviera llenado desde un observable o si estuviera extrayendo laa data de la url usando un resolver
//events: any; // funciona con  ###

constructor(@Inject(forwardRef(() => EventService)) private eventService: EventService,
            @Inject(forwardRef(() => EventService)) private toastrService: ToastrService,
            @Inject(forwardRef(() => ActivatedRoute)) private route: ActivatedRoute
            ) {}


ngOnInit(): void {
  /* Para trabajar obteniendo los datos de manera SINCRONA */
  //this.events = this.eventService.getEvents();

  /*  ###
  Con esto simulo que estoy obteniendo la data a traves de un observable simulando ASINCRONIA */
  // this.eventService.getEventsResolver().subscribe(events =>  this.events = events);

  /* Aqui estoy sacando la data de la URL que me envia desde el resolver, no estoy haciendo uso de un observable
   hasta que no tenga la data a mostrar no se mostrara el componente que lista los eventos*/
  this.events =  this.route.snapshot.data['events'];

}

  handleEventClick(infor): void {
    console.log(' valor emitido por el @output :', infor );
  }


  handleThumbnailClick(eventName) {
      this.toastrService.success(eventName);
  }
}
