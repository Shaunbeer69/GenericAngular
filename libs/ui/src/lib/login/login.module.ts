import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { GenericFormModule } from '../generic-form/generic-form.module';
import { RouterModule } from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    GenericFormModule,
    TranslateModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component:LoginComponent},
   ])
  ],
  declarations: [
    LoginComponent
  ],
  providers:[]
})

export class LoginModule { }
