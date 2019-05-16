import { Directive } from '@angular/core';
import { Validator, FormGroup, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[validateLocation]',
  /* registro mi directiva de validacion en los validadores integrados de angular */
  providers: [{provide: NG_VALIDATORS, useExisting: LocationValidatorDirective, multi: true }]
})
export class LocationValidatorDirective  implements Validator {

  validate(formGroup: FormGroup): ValidationErrors | null {

    const addressControl = formGroup.controls['address'];
    const cityControl = formGroup.controls['city'];
    const countryControl = formGroup.controls['country'];
    const onlineUrlControl = (formGroup.root as FormGroup).controls['onlineUrl'];

     console.log(' esto es la directiva el formGroup que llega es ', formGroup.root);
    if( (addressControl && addressControl.value
        && cityControl && cityControl.value
        && countryControl && countryControl.valid)
     || (onlineUrlControl && onlineUrlControl.value)) {
        return null;
     }
    return {'validateLocation': false};
  }

  constructor() { }

}
