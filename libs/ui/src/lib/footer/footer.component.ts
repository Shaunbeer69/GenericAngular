import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataWidgetService } from '@ga/data-management';

@Component({
  selector: 'gaip-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private dataWidgetService: DataWidgetService) { }

  onClick(event:string) {
    document.getElementById("closeModal").click()
    this.dataWidgetService.SetEventLister(event);
  }

  ngOnInit(): void {
  }

}
