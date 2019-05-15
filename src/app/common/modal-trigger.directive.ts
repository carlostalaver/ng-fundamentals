import { Directive, OnInit, Inject, ElementRef, forwardRef, Input } from '@angular/core';
import { JQ_TOKEN } from './jQuery.service';

@Directive({
  selector: '[modal-trigger]' /* se indica entre [] porque modal-trigger es un ATRIBUTO no un elemento html */
})
export class ModalTriggerDirective implements OnInit {
  private elemento: HTMLElement;             // el boton al que le add el atributo  modal-trigger
  @Input('modal-trigger') modalId: string;   // para recuperar el id del modal a ser procesado

  constructor(@Inject(JQ_TOKEN) private $: any,
              @Inject(forwardRef(() => ElementRef)) private ref: ElementRef ) {
    this.elemento = ref.nativeElement;

  }

  ngOnInit(): void {
    this.elemento.addEventListener('click', e  => {
      /* simple-modal ES EL ID  de la palantilla del componente que pinta el modal, SimpleModalComponent  */
      this.$(`#${this.modalId}`).modal({});
    });
  }

}
