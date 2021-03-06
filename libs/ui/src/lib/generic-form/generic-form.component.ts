import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";
import { FormGroup, Validators } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { DataTransferInterfaceService } from "@ga/core";
import { DataService } from '@ga/data-management';
@Component({
  selector: 'gaip-generic-form',
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.scss']
})
export class GenericFormComponent implements OnInit,AfterViewInit, OnDestroy {

  @Input() route:string;
  @Output() Model = new EventEmitter();

  @ViewChild("activeForm") Form;
  public path: string;
  private $onDestroy: Subject<any> = new Subject<any>();
  public form = new FormGroup({});
  public model: any = {};
  public options: FormlyFormOptions = {};
  public fields: FormlyFieldConfig[] = [];
  public extra: any =
  {
    "button":
      {
        label:'',
        value:false,
        disabled:false
      }
  };

  constructor(
    routes: ActivatedRoute,
    private dataTransferInterfaceService: DataTransferInterfaceService,
    private DataService: DataService) {
    this.DataService.SetIsTransaction(true);

    routes.paramMap.pipe(takeUntil(this.$onDestroy)).subscribe(paraMap => {
      this.path = routes.snapshot['_routerState'].url;
      if(this.route == undefined && paraMap['params'].parameter != undefined)
      {
        this.GetData(paraMap['params'].parameter);
      }
    });
  }
  ngAfterViewInit(): void {
    if(this.route != undefined)
    {
      this.GetData(this.route);
    }
    this.DataService.EventListen().subscribe((event:string)=>{
      if(event == "submit")
      {
        this.onSubmit();
      }
    });
  }

  ngOnInit(): void {
  }

  async GetData(type: string) {

    let result = await this.dataTransferInterfaceService.getInterfaceData(type).toPromise();
    this.model = result[0];
    let prevalidatorFields: FormlyFieldConfig[] = result[1];
    let Validators: any[] = await this.dataTransferInterfaceService.GetValidators().toPromise();
    this.fields = await this.ApplyValidators(Validators, prevalidatorFields);
    if(result[2] != null)
    {
      this.extra = result[2];
    }
    console.log(this.Form);
    this.DataService.ActiveForm = this.Form.form;

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


  onSubmit() {
    this.Model.emit(this.model);
  }

  ngOnDestroy(): void {
    this.$onDestroy.next();
    this.$onDestroy.complete();
  }

}
