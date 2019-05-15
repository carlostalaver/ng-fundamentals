import { Injectable } from '@angular/core';
import { ISession } from 'src/app/events';

@Injectable({
  providedIn: 'root'
})
export class VoterService {

  constructor() { }
  deleteVoter(session: ISession, voterName: string) {
    session.voters = session.voters.filter(voter => voter !== voterName );
  }

  addVoter(session: ISession, voterName: string ): void{
    session.voters.push(voterName);
  }

  userHasVoted(session: ISession, voterName: string ) {
    return session.voters.some(voter => voter === voterName);
  }
}


