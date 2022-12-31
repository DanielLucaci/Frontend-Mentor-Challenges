import { Component, OnInit } from '@angular/core';
import { Step } from '../../models/step.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  steps: Step[] = [
    new Step('Your info', '/step/your-info'),
    new Step('Select plan', '/step/select-plan'),
    new Step('Add-ons', '/step/add-ons'),
    new Step('Summary', '/step/summary')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
