import { Component, Inject, forwardRef } from "@angular/core";
import { AuthService } from "src/user/auth.service";
import { IUser } from "src/user/user.model";
import { EventService } from './../app/events/shared/event.service';
import { ISession } from "src/app/events";


@Component ({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styles: [`
    .nav.navbar-nav { font-size: 15x; }
    #searchForm {margin-right: 10px;}
    @media (max-width: 1200px) {#searchForm {display: none}}
    li > a.active { color: #F97924; }
  `]
})
export class NavBarComponent {
  searchTerm = '';
  foundSession: ISession[];

  constructor(@Inject(forwardRef(() => AuthService)) public authService: AuthService,
              @Inject(forwardRef(() => EventService)) public eventService: EventService) {

  }

  searchSession(searchTerm: string) {
    console.log('llamando al searchSession');

    this.eventService.searchSessionForMe(searchTerm)
      .subscribe(sessionList => {
        this.foundSession = sessionList;
        console.log('el filtro de las sessiones es ', this.foundSession);
      });
  }

}
