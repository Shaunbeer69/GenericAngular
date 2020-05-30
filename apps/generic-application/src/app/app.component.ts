import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { DataWidgetService } from '@ga/data-management';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoginService } from '@ga/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,AfterViewInit,OnDestroy{
  isCollapsed = false;
  public loading:Boolean;
  public footer:Boolean;
  public login:Boolean;
  
  $onDestroy : Subject<any> = new Subject<any>(); 

  constructor(private dataWidget:DataWidgetService, private loginService:LoginService, private router:Router, public translate:TranslateService)
  {
    translate.addLangs(['en', 'fr']);  
    if (localStorage.getItem('locale')) {  
      const browserLang = localStorage.getItem('locale');  
      translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');  
    } else {  
      localStorage.setItem('locale', 'en');  
      translate.setDefaultLang('en');  
    }  
  }

  ngOnInit(): void {
    this.dataWidget.GetIsLoading().pipe(takeUntil(this.$onDestroy)).subscribe((loadingBool:Boolean)=>{
      this.loading = loadingBool;
    });
    this.dataWidget.GetIsTransaction().pipe(takeUntil(this.$onDestroy)).subscribe((transactionBool:Boolean)=>{
      this.footer = transactionBool;
    });
    this.loginService.GetLoginStatus().pipe(takeUntil(this.$onDestroy)).subscribe((loginStatus:Boolean)=>{
      this.login = loginStatus;
    });
  }

  ngAfterViewInit(): void {
    let status:Boolean = Boolean(sessionStorage.getItem('login'));
    if(status)
    {
      this.loginService.SetLoginStatus(status);
    }
  }

  public Logout()
  {
    this.loginService.SetLoginStatus(false);
    this.router.navigate(['/login']);
    sessionStorage.setItem('login','false');
  }

  ngOnDestroy(): void {
    this.$onDestroy.next();
    this.$onDestroy.complete();
  }
}
