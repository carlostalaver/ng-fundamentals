import { Resolve } from "@angular/router";
import { Injectable, Inject, forwardRef } from "@angular/core";
import { EventService } from "./shared/event.service";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventListResolver implements Resolve<any> {

  constructor(@Inject(forwardRef(() => EventService)) private eventService: EventService) {
  }
  /* por lo general en un metodo resolver se realiza una llamada a un metodo asincrono */

  resolve() {
    return this.eventService.getEventsResolver().pipe(
        map(events => events)
      );
  }
}
