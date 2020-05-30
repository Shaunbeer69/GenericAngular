import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Injectable()
export class DataTransferInterfaceService {



  constructor(private http: HttpClient) {}

  getInterfaceData(type:string): Observable<any> {
    return forkJoin([this.getModel(type), this.getFields(type),this.getFormSetup(type)]);
  }

  getInterfaceTableData(type:string): Observable<any> {
    return forkJoin([this.getListModel(type), this.getTableSetup(type)]);
  }

  getModel(type:string) {
    return this.http.get<any>('assets/'+type+'/'+type+'.json');
  }

  getListModel(type:string) {
    return this.http.get<any>('assets/'+type+'/'+type+'-list.json');
  }

  getFormSetup(type:string) {
    return this.http.get<FormlyFieldConfig[]>('assets/'+type+'/'+type+'-form-extra.json');
  }

  getFields(type:string) {
    return this.http.get<FormlyFieldConfig[]>('assets/'+type+'/'+type+'-form.json');
  }

  getTableSetup(type:string) {
    return this.http.get<FormlyFieldConfig[]>('assets/'+type+'/'+type+'-table-setup.json');
  }

  GetValidators() : Observable<any> {
    return this.http.get<any>('assets/Validators.json');
   }

}