import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { GenericFormModule } from '../generic-form/generic-form.module';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    GenericFormModule,
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
