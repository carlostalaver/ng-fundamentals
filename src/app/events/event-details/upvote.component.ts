import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'upvote',
  template: `
  <div class="votingWidgetContainer pointable" (click)="onClick()">
    <div class="well votingWidget">
      <div class="botingButton">
        <i class="glyphicon glyphicon-heart" [style.color]="voted"></i>
      </div>
      <div  class="badge badge-inverse votingCount">
        <div>{{count}}</div>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['./upvote.componente.css']
})
export class UpvoteComponent implements OnInit {

  _iconColor: string;
  @Input() count: number;
  @Output() vote  = new EventEmitter();

  @Input()
  set voted(val) {
    this._iconColor = val ? 'red' : 'white';
  }

  get voted(): string {
    return this._iconColor;
  }

  constructor() { }

  ngOnInit() {

  }

  onClick() {
    this.vote.emit({});
  }

}
