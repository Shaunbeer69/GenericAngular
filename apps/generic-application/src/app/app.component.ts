import { Component, OnDestroy, OnInit, AfterViewInit, Injector, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentFactory, Type } from '@angular/core';
import { DataService, TransactionComponent } from '@ga/data-management';
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

  public activeItem = null;
  public activeTask = null;

  $onDestroy: Subject<any> = new Subject<any>();

  constructor(
    public dataService: DataService,
    private loginService: LoginService,
    private router: Router,
    public translate: TranslateService,
    private DTIS: DataTransferInterfaceService,
    private componentFactoryResolver: ComponentFactoryResolver,
    public viewContainerRef: ViewContainerRef
  ) {
    translate.addLangs(['en', 'fr']);
    let lang = 'en';
    if (lang) {
      const browserLang = lang;
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

    this.dataService.GetIsLoading().pipe(takeUntil(this.$onDestroy)).subscribe((loadingBool: Boolean) => {
      this.loading = loadingBool;
    });
    this.dataService.GetIsTransaction().pipe(takeUntil(this.$onDestroy)).subscribe((transactionBool: Boolean) => {
      this.footer = transactionBool;
      if (transactionBool == false) {
        this.router.navigate(["/Home"]);
        this.SetHome();
        this.getMenu();
      }
      else {
        this.getMenu();
      }
    });
    this.loginService.GetLoginStatus().pipe(takeUntil(this.$onDestroy)).subscribe((loginStatus: Boolean) => {
      this.login = loginStatus;
    });

  }

  async getMenu() {
    this.dataService.Menu = await this.DTIS.getMenu().toPromise();
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

  public SetHome() {
    this.transaction = false;
    this.activeItem = null;
  }



  public SetFunction(_function: any) {
    if (_function.function) {
      this.createComponent(_function.function + "Component");
    }
    this.dataService.SetIsTransaction(true);
    this.activeTaskClass = 0;
    this.activeItem = this.dataService.Menu[_function.order];
    this.activeTask = this.activeItem.tasks[0];
    this.transaction = true;
  }


  createComponent(type) {
    const object = Array.from(this.componentFactoryResolver['ngModule'].instance.constructor.decorators.values())[0]['args'][0];
    const factories = object.declarations.concat(object.entryComponents, object.imports, object.providers);
    const factoryClass = <Type<any>>factories.find((x: any) => x.name === type);
    const factory = this.componentFactoryResolver.resolveComponentFactory(factoryClass);
    let cmpRef = this.viewContainerRef.createComponent(factory);
    cmpRef.instance.message = "message";
    cmpRef.instance.ShowParent();
  }

  public Logout() {
    this.transaction = false;
    this.loginService.SetLoginStatus(false);
    this.router.navigate(['/login']);
    sessionStorage.setItem('login', 'false');
    this.dataService.Menu = [];
  }

  ngOnDestroy(): void {
    this.$onDestroy.next();
    this.$onDestroy.complete();
  }
}
