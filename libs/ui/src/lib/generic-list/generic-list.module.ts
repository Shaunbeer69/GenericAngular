import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { DataTableModule } from '../data-table/data-table.module';
import { HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { GenericListComponent } from './generic-list.component';
@NgModule({
  imports: [CommonModule,
    DataTableModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: GenericListComponent }
    ])  
  ],
  declarations: [GenericListComponent]
})
export class GenericListModule { }
