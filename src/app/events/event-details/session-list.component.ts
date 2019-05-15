import { Component, Input, OnChanges, Inject, forwardRef } from '@angular/core';
import { ISession } from '../shared';
import { AuthService } from './../../../user/auth.service';
import { VoterService } from 'src/user/voter.service';

@Component({
  selector: 'session-list',
  templateUrl: './session-list.component.html'
})
export class SessionListComponent  implements OnChanges{
  @Input() sessions: ISession[];
  @Input() filterBy: string;
  @Input() sortBy: string;

  _test: string;
  @Input() set tst(value: string ) {
    console.log('llamando al setttt ', value);
    this._test = value;
  }

  visibleSessions: ISession[] = [];

  constructor(@Inject(forwardRef(() => AuthService)) private auth: AuthService,
              @Inject(forwardRef(() => VoterService)) private voterService: VoterService){}
  ngOnChanges(): void {

    if (this.sessions) {
      this.filterSession(this.filterBy);
      this.sortBy === 'name'
          ? this.visibleSessions.sort(sortByNameAsc)
          : this.visibleSessions.sort(sortByVotesDesc);
    }
  }

   filterSession(filter: string) {
    if (filter === 'all') {
      this.visibleSessions = this.sessions.slice(0);
    } else {
      this.visibleSessions = this.sessions.filter(session => {
        return session.level.toLocaleLowerCase() === filter;
      });
    }
  }

  toggleVote(session: ISession) {
    if(this.userHasVoted(session)) {
      this.voterService.deleteVoter(session, this.auth.currentUser.userName);
    } else {
      this.voterService.addVoter(session, this.auth.currentUser.userName);
    }
    if(this.sortBy === 'votes'){
      this.visibleSessions.sort(sortByVotesDesc);
    }
  }

  userHasVoted(session: ISession) {
    return this.voterService.userHasVoted(session, this.auth.currentUser.userName);
  }

}

function sortByNameAsc(s1: ISession, s2: ISession) {
  if (s1.name > s2.name) {
    return 1;
  } else if (s1.name === s2.name) {
    return 0;
  } else {
    return -1;
  }
}


function sortByVotesDesc(s1: ISession, s2: ISession) {
  return s2.voters.length - s1.voters.length;
}
