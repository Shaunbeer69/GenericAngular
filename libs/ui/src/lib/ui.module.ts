import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataTransferInterfaceService } from '@ga/core';
import { AuthGuardService as AuthGuard } from '@ga/security'
import { LoginComponent } from './login';



@NgModule({
  imports: [CommonModule,
    RouterModule.forChild([
      {
        path: 'Home',
        canActivate:[AuthGuard],
        pathMatch: 'full',
        loadChildren: () => import('@ga/ui').then(m => m.HomeModule)
      },
      {
        path: 'GenericForm/:parameter',
        canActivate:[AuthGuard],
        pathMatch: 'full',
        loadChildren: () => import('@ga/ui').then(m => m.GenericFormModule)
      },
      {
        path: 'GenericTable/:parameter',
        canActivate:[AuthGuard],
        pathMatch: 'full', loadChildren: () => import('@ga/ui').then(m => m.GenericListModule)
      },
      {
        path: 'login',
        pathMatch: 'full',
        component:LoginComponent
      }
    ])],
  declarations: [],
  providers: [DataTransferInterfaceService, AuthGuard]
})
export class UiModule { }
