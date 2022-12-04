import { Component, OnInit } from '@angular/core';
import { CalculatorService } from '../calculator.service';
import { MainThemeService } from '../main-theme.service';

@Component({
  selector: 'app-calculator-header',
  templateUrl: './calculator-header.component.html',
  styleUrls: [
    './styles/calculator-header.component.scss',
    './styles/calculator-header-theme1.component.scss',
    './styles/calculator-header-theme2.component.scss',
    './styles/calculator-header-theme3.component.scss',
  ]
})
export class CalculatorHeaderComponent implements OnInit {

  constructor(private calcService: CalculatorService, private themeService: MainThemeService) { }

  ngOnInit(): void {
  }

  onThemeChange(event: MouseEvent) {
    if(event.offsetX <= 18) {
      this.themeService.setTheme('Theme1');
    } else if(event.offsetX > 18 && event.offsetX <= 37) {
      this.themeService.setTheme('Theme2');
    } else {
      this.themeService.setTheme('Theme3');
    }
  }
}
