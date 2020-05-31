import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { UiModule, FooterComponent, LoginModule } from '@ga/ui';
import { TransactionModule } from '@ga/transaction';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { DataWidgetService } from '@ga/data-management';
import { LoginService } from '@ga/core';
import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { NzIconModule } from 'ng-zorro-antd/icon';

export const createTranslateLoader = (http:HttpClient)=>
{
  return new TranslateHttpLoader(http,'assets/i18n/','.json')
};

@NgModule({
  declarations: [AppComponent,FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    UiModule,
    TransactionModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    NzIconModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:createTranslateLoader,
        deps:[HttpClient]
      }
    })
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US },DataWidgetService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule {}
