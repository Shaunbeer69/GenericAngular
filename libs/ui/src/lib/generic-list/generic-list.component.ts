import { Component, OnInit, Input } from '@angular/core';
import { DataTransferInterfaceService } from '@ga/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'gaip-person-list',
  templateUrl: './generic-list.component.html',
  styleUrls: ['./generic-list.component.scss']
})
export class GenericListComponent implements OnInit {

  @Input() route: string;
  public path: string;
  public src: any[];
  public actions: any = 
  {
    view:false,
    select:false,
    edit:false,
    add:false,
  };
  public columns: string[] = [];
  public title: string = "";
  public fields: FormlyFieldConfig[] = [];
  private $onDestroy: Subject<any> = new Subject<any>();
  private tableType


  constructor(private dataTransferInterfaceService: DataTransferInterfaceService, routes: ActivatedRoute) {
  routes.paramMap.pipe(takeUntil(this.$onDestroy)).subscribe(paraMap => {
      this.path = routes.snapshot['_routerState'].url;
      if (this.route == undefined && paraMap['params'].parameter != undefined) {
          this.GetData(paraMap['params'].parameter);
      }
    });
  }

  async GetData(type:string) {
    let x = await this.dataTransferInterfaceService.getInterfaceTableData(type).toPromise();
    this.src = x[0];
    let columnSetup = x[1];
    let columnArray:string[] = [];
    this.title = columnSetup.title;

    let obj = await this.dataTransferInterfaceService.getFields(type).toPromise();
    let prevalidatorFields: FormlyFieldConfig[] = obj;
    let Validators: any[] = await this.dataTransferInterfaceService.GetValidators().toPromise();
    this.fields = await this.ApplyValidators(Validators, prevalidatorFields);


    columnSetup.columns.forEach(column => {
      columnArray.push(column);
    });
    if(columnSetup.actions.length != 0)
    {
      columnArray.push("Actions");
      columnSetup.actions.forEach(action => {
        this.actions[action] = true;
      });
    }
    this.columns = columnArray;
  }


  ngOnInit(): void {

  }

  ApplyValidators(ValidatorFields: any[], Fields: FormlyFieldConfig[]): FormlyFieldConfig[] {
    ValidatorFields.forEach(validatorField => {
      let field = Fields.find(field => { return validatorField.key == field.key });
      if (field != undefined) {
        validatorField.validation.forEach(validators => {
          field.templateOptions[validators.validator] = validators.value;
          field.validation = { show: true };
        });
      }
    });
    return Fields;
  }

}
