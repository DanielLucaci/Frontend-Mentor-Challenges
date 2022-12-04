import { Component } from '@angular/core';
import { ThemeDirectiveDirective } from './calculator/theme-directive.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'calculator-angular';
  constructor() {}
}
