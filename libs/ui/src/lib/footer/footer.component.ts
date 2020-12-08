import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '@ga/data-management';

@Component({
  selector: 'gaip-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private DataService: DataService) { }

  onClick(event:string) {
    document.getElementById("closeModal").click()
    this.DataService.SetEventLister(event);
  }

  ngOnInit(): void {
  }

}
