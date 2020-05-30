import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoginService } from '@ga/core';
import { Router } from '@angular/router';
import { DataWidgetService } from '@ga/data-management';

@Component({
  selector: 'gaip-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  public param = "login";
  constructor(private loginService:LoginService, private router:Router, private dataWidgetService:DataWidgetService) { }


  ngOnInit(): void {
    this.loginService.SetLoginStatus(false);
  }

  ngAfterViewInit(): void {

  }

  login(event:any)
  {
    this.loginService.SetLoginStatus(true);
    this.router.navigate(['/Home']);
    sessionStorage.setItem('login','true')
  }
 
}
