import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  EventsListComponent,
  EventThumbnailComponent,
  EventDetailsComponent,
  CreateEventComponent,
  EventRouteActivator,
  EventListResolver,
} from './events/index';
import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from 'src/nav/navbar.component';
import { appRoutes } from './route';
import { Error404Component } from './errors/404.component';
import { AuthService } from 'src/user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateSessionComponent } from './events/event-details/create-session.componet';
import { SessionListComponent } from './events/event-details/session-list.component';
import { CollapsibleWellComponent } from './common/collapsible-well.component';
import { DurationPipe } from './events/shared/duration.pipe';
import { SimpleModalComponent } from './common/simple-modal.component';

/* Para trabajar con token injections  */
import { TOASTR_TOKEN, IToastr } from './common/toastr.service';
import { JQ_TOKEN } from './common/jQuery.service';
import { ModalTriggerDirective } from './common/modal-trigger.directive';
const toastr: IToastr = window['toastr'];
const jQuery = window['$'];


@NgModule({
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    EventRouteActivator,
    EventListResolver,
    AuthService,
    /* usando la forma manual, se lee cuando necesite el guardia  canDeactivateCreateEvent usa la duncion checkDirtyState
       esto lo hice como alternativa a la manera convencional (la que usa servicios), notar que checkDirtyState es una
       funcion, no un servicio.
    */
    { provide: 'canDeactivateCreateEvent', useValue: checkDirtyState },
    { provide: TOASTR_TOKEN, useValue: toastr },
    { provide: JQ_TOKEN, useValue: jQuery }
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

// tslint:disable-next-line:max-line-length
/* el primer parametro que recibe la funcion canDeactivate es el componente en sí, hay mas */
export function checkDirtyState(component: CreateEventComponent) {

  if (component.isDirty) {
    return window.confirm('You have not saved this event, do you really want to cancel?');
  }
  return true;
}
