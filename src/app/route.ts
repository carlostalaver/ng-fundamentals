import { Routes } from '@angular/router';
import { EventsListComponent,
         EventDetailsComponent,
         CreateEventComponent,
         EventRouteActivator,
         EventListResolver,
         CreateSessionComponent
         } from './events/index';
import { Error404Component } from './errors/404.component';


export const appRoutes: Routes = [
  // tslint:disable-next-line:max-line-length

  /* El guardia canDeactivate: ['canDeactivateCreateEvent'] hace uso de
     una funcion, no un servicio, se implementa de otra manera,
     notar que cuando es una funcion va  en  '', la funcion de la el aguardia hace uso está
     implementada en el archivo app.module.ts   */
  { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent'] },
  { path: 'events', component: EventsListComponent, resolve: { events: EventListResolver } },
  { path: '404', component: Error404Component },
  { path: 'events/:id', component: EventDetailsComponent, canActivate: [EventRouteActivator] },
  { path: 'events/session/new', component: CreateSessionComponent },
  { path: '', pathMatch: 'full', redirectTo: '/events' },
  { path: 'user', loadChildren: '../user/user.module#UserModule' }

];


