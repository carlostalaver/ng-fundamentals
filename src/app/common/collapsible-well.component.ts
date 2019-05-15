import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: ' collapsible-well',
  template: `
    <div (click)="toggleContent()" class="well pointable">
       <h4>
          <!-- [well-title] porque es la identificacion del div que calapsará-->
         <ng-content select="[well-title]"></ng-content>
       </h4>
         <!-- [well-body] porque es la identificacion  del div que calapsará-->
       <ng-content select="[well-body]" *ngIf="visible"></ng-content>
    </div>`
})
export class CollapsibleWellComponent implements OnInit {
  @Input() title: string;
  visible = true;
  constructor() { }

  ngOnInit() {
  }

  toggleContent() {
    this.visible = !this.visible;
  }

}
