import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from "@angular/router";
import { FormGroup, FormControl } from '@angular/forms';
@Injectable()
export class DataService {
  private isTransaction: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  private isLoading: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  private buttonEventListener: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public Menu: any[] = [];
  public ActiveForm: FormGroup;
  constructor(private http: HttpClient,private router : Router) {
  }


  public EventListen(): Observable<string> {
    return this.buttonEventListener.asObservable();
  }

  public SetEventLister(event: string) {
    if (event == "cancel")
    {
      this.router.navigate(['/Home']);
       this.buttonEventListener.next(null);
    }
    else {
      this.buttonEventListener.next(event);
    }
  }


  public GetIsTransaction(): Observable<Boolean> {
    return this.isTransaction.asObservable();
  }

  public SetIsTransaction(bool: Boolean) {
    this.isTransaction.next(bool);
  }

  public GetIsLoading(): Observable<Boolean> {
    return this.isLoading.asObservable();
  }

  public SetIsLoading(bool: Boolean) {
    this.isLoading.next(bool);
  }

}
