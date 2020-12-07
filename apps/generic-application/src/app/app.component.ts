import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { DataWidgetService } from '@ga/data-management';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoginService } from '@ga/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataTransferInterfaceService } from "@ga/core";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  isCollapsed = false;
  public loading: Boolean;
  public footer: Boolean;
  public login: Boolean;
  public activeTaskClass = 0;
  public transaction = false;


  public Menu: any[] = [];


  public activeItem = null;
  public activeTask = null;

  $onDestroy: Subject<any> = new Subject<any>();

  constructor(private dataWidget: DataWidgetService, private loginService: LoginService, private router: Router, public translate: TranslateService, private DTIS:DataTransferInterfaceService) {
    translate.addLangs(['en', 'fr']);
    let test = 'en';
    if (test) {
      const browserLang = test;
      translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    } else {
      localStorage.setItem('locale', 'en');
      translate.setDefaultLang('en');
    }
  }

  ngOnInit(): void {
    this.activeItem = null;
    this.activeTask = null;
    this.transaction = false;
   
    this.dataWidget.GetIsLoading().pipe(takeUntil(this.$onDestroy)).subscribe((loadingBool: Boolean) => {
      this.loading = loadingBool;
    });
    this.dataWidget.GetIsTransaction().pipe(takeUntil(this.$onDestroy)).subscribe((transactionBool: Boolean) => {
      this.footer = transactionBool;
      if(transactionBool == false)
      {
        this.router.navigate(["/Home"]);
        this.SetHome();
        this.getMenu();
      }
      else
      {
        this.getMenu();
      }
    });
    this.loginService.GetLoginStatus().pipe(takeUntil(this.$onDestroy)).subscribe((loginStatus: Boolean) => {
      this.login = loginStatus;
    });
    
  }

  async getMenu()
  {
    this.Menu = await this.DTIS.getMenu().toPromise();
    console.log(this.Menu);
  }

  ngAfterViewInit(): void {
    let status: Boolean = Boolean(sessionStorage.getItem('login'));
    if (status) {
      this.loginService.SetLoginStatus(status);
    }
  }

  public setActive(numb: number) {
    this.activeTaskClass = numb;
    this.activeTask = this.activeItem.tasks[numb];
  }

  public SetHome()
  {
    this.transaction = false;
    this.activeItem = null;
  }

  public SetFunction(numb: number)
  {
    this.dataWidget.SetIsTransaction(true);
    this.activeTaskClass = 0;
    this.activeItem = this.Menu[numb];
    this.activeTask = this.activeItem.tasks[0]; 
    this.transaction = true;
  }


  public Logout() {
    this.transaction = false;
    this.loginService.SetLoginStatus(false);
    this.router.navigate(['/login']);
    sessionStorage.setItem('login', 'false');
    this.Menu = [];
  }

  ngOnDestroy(): void {
    this.$onDestroy.next();
    this.$onDestroy.complete();
  }
}
