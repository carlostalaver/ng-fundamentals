import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EventsListComponent,
         EventThumbnailComponent,
         EventDetailsComponent,
         CreateEventComponent,
         EventRouteActivator,
         EventListResolver,
        } from './events/index';
import { EventsAppComponent} from './events-app.component';
import { NavBarComponent } from 'src/nav/navbar.component';
import { appRoutes } from './route';
import { Error404Component } from './errors/404.component';
import { AuthService } from 'src/user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateSessionComponent } from './events/event-details/create-session.componet';
import { SessionListComponent } from './events/event-details/session-list.component';


@NgModule({
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent, SessionListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [EventRouteActivator, EventListResolver, AuthService,
    {
      provide: 'canDeactivateCreateEvent',
      useValue: checkDirtyState,

    }],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

// tslint:disable-next-line:max-line-length
export function checkDirtyState(component: CreateEventComponent) { /* el primer parametro que recibe la funcion canDeactivate es el componente en sí */

  if (component.isDirty) {
    return window.confirm('You have not saved this event, do you really want to cancel?');
  }
  return true;
}
