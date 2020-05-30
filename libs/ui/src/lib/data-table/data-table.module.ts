import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { DataTableComponent } from '../data-table/data-table.component';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import {CdkTableModule} from '@angular/cdk/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { maxlengthValidationMessage, minlengthValidationMessage, maxValidationMessage, minValidationMessage } from '../generic-form/generic-form.module';
import { FormlyHorizontalWrapper } from './horizontal-wrapper';

@NgModule({
  imports: [CommonModule,
    MatTableModule,
    MatFormFieldModule,
    CdkTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot({
      wrappers: [{ name: 'form-field-horizontal', component: FormlyHorizontalWrapper }],
      validationMessages: [
        { name: 'required', message: 'This field is required' },
        { name: 'minlength', message: minlengthValidationMessage },
        { name: 'maxlength', message: maxlengthValidationMessage },
        { name: 'min', message: minValidationMessage },
        { name: 'max', message: maxValidationMessage },
      ],
    }),
  ],
  declarations: [DataTableComponent,FormlyHorizontalWrapper],
  entryComponents: [DataTableComponent],
  exports: [DataTableComponent,FormlyHorizontalWrapper]
})
export class DataTableModule { }
