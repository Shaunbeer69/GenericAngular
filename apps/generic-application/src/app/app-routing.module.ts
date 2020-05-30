import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/Home' },
  {
    path: '',
    loadChildren: () => import('@ga/transaction').then(m => m.TransactionModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes/*,{ enableTracing: true }*/)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
