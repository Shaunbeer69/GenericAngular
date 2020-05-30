import { Component, OnInit, Input, ViewChild, OnChanges, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';


@Component({
  selector: 'giap-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {

  
  @Input() actions: any;
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: any[] = [];
  displayDataSource = new MatTableDataSource<any>(this.dataSource);
  dataLength: number;
  @Input() title: string;
  @Input() fields:FormlyFieldConfig[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  Display: boolean = false;
  public activeAction: string;
  public activeRow: any;
  public form = new FormGroup({});
  public model: any = {};
  public options: FormlyFormOptions = {};
  activeRowCopy: any;

  constructor() {
    this.dataLength = this.dataSource.length;
    this.displayDataSource.paginator = this.paginator;
    this.displayDataSource.sort = this.sort;
  }
  ngAfterViewInit(): void {

  }

  HasActions(col:string)
  {
    if(col.includes('Actions'))
    {
          return true;
    }
    else
    {
      return false;
    }    
  }

  ActionClick(action:string, row:any)
  {
    this.activeAction = action;
    this.activeRow = JSON.parse(JSON.stringify(row));
    this.model = this.activeRow;
    if(action == "view" || action == "delete")
    {
      this.form.disable();
    }
    else
    {
      this.form.enable();
    }
  }

  Remove()
  {
    let object = this.displayDataSource.data.find(x=>{return x.id==this.activeRow.id});
    const index = this.displayDataSource.data.indexOf(object);
    this.displayDataSource.data.splice(index, 1);
    this.displayDataSource._updateChangeSubscription();
    document.getElementById("closeModalButton").click()
    this.activeRow = null;
  }

  IsFormValid()
  {
    if(this.form.valid)
    {return false;}
    else
    {return true;}
  }

  Save()
  { 
    let object = this.displayDataSource.data.find(x=>{return x.id==this.activeRow.id});
    const index = this.displayDataSource.data.indexOf(object);
    this.displayDataSource.data[index] = this.activeRow;
    this.displayDataSource._updateChangeSubscription();
    document.getElementById("closeModalButton").click()
    this.activeRow = null;
  }

  ngOnInit() {
  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.displayDataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnChanges(): void {
    this.displayDataSource = new MatTableDataSource<any>(this.dataSource);
    this.displayDataSource.paginator = this.paginator;
    this.displayDataSource.sort = this.sort;
    this.dataLength = this.dataSource.length;

  }

  ngOnDestroy(): void {
   
  }
}