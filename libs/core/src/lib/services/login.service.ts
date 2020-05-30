import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class LoginService {

  private loginStatus: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  constructor(private http: HttpClient) {}


  public GetLoginStatus(): Observable<Boolean> {
    return this.loginStatus.asObservable();
  }

  public SetLoginStatus(bool: Boolean) {
    this.loginStatus.next(bool);
  }



}