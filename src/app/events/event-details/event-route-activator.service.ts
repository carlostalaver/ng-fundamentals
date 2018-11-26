import { Injectable, forwardRef, Inject } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { EventService } from "../shared/event.service";

@Injectable({
  providedIn: 'root'
})
export class EventRouteActivator  implements CanActivate {
 constructor(@Inject(forwardRef(() => EventService)) private eventService: EventService,
             @Inject(forwardRef(() => Router)) private router: Router) {

 }

 canActivate(route: ActivatedRouteSnapshot): boolean {
  const eventExists = !!this.eventService.getEvent(+route.params['id']);

  if (!eventExists) {
    this.router.navigate(['/404']);
  }
  return eventExists;
}
}
