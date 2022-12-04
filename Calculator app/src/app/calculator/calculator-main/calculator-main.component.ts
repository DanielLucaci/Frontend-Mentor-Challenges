import { Component, OnInit } from '@angular/core';
import { CalculatorService } from '../calculator.service';

@Component({
  selector: 'app-calculator-main',
  templateUrl: './calculator-main.component.html',
  styleUrls: [
    './styles/calculator-main.component.scss',
    './styles/calculator-main-theme1.component.scss',
    './styles/calculator-main-theme2.component.scss',
    './styles/calculator-main-theme3.component.scss',
  ]
})
export class CalculatorMainComponent implements OnInit {
  buttons: { top: string[], bottom: string[]} = {
    top: [
      '7',
      '8',
      '9',
      'DEL',
      '4',
      '5',
      '6',
      '+',
      '1',
      '2',
      '3',
      '-',
      '.',
      '0',
      '/',
      'x',
    ],
    bottom: [
      'RESET',
      '=',
    ]
  };

  constructor(private calcService: CalculatorService) { }

  ngOnInit(): void {
  }

  buttonClicked(button: string) {
    this.calcService.keyPressed(button);
  }
}
