import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
       {path: '', pathMatch: 'full', loadChildren: () => import('@ga/ui').then(m => m.UiModule)} 
    ])
  ]
})
export class TransactionModule {}
