import { Component } from '@angular/core';
import { TransactionComponent } from '../Transaction.component';

@Component({
  selector: 'app-functionOne',
  template: ``,
})

export class FunctionOneComponent extends TransactionComponent {
  message:string;

  constructor() {
    super();

  }


  ShowParent()
  {
    this.CallParent();
    console.log("FunctionOne Service Created");
  }

}
