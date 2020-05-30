import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-horizontal-wrapper',
  template: `
    <div class="form-group row justify-content-between mx-auto" style="width:80%; min-width:345px;">
      <label [attr.for]="id" class="col-sm-4 col-form-label " *ngIf="to.label">
        {{ to.label }}
        <ng-container *ngIf="to.required && to.hideRequiredMarker !== true">*</ng-container>
      </label>
      <div class="col-sm-4" style = "min-width:350px">
        <ng-template #fieldComponent></ng-template>
        <div *ngIf="showError" class="col-sm-10 pl-0 invalid-feedback d-block">
            <formly-validation-message [field]="field"></formly-validation-message>
        </div>
      </div>
    </div>
  `,
})
export class FormlyHorizontalWrapper extends FieldWrapper {
}