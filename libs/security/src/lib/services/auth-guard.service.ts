import { Injectable, AfterViewInit, OnInit } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate, AfterViewInit, OnInit {
  constructor(public router: Router) 
  {
  
  }
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
  
  }
  canActivate(): boolean {
    let status = sessionStorage.getItem('login');
    if (status == 'false' || status == undefined) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}