import { Component, OnInit, OnDestroy } from '@angular/core';
import { CalculatorService } from '../calculator.service';
import { Subscription, map, catchError } from 'rxjs';

@Component({
  selector: 'app-calculator-screen',
  templateUrl: './calculator-screen.component.html',
  styleUrls: [
    './styles/calculator-screen.component.scss',
    './styles/calculator-screen-theme1.component.scss',
    './styles/calculator-screen-theme2.component.scss',
    './styles/calculator-screen-theme3.component.scss'
  ]
})
export class CalculatorScreenComponent implements OnInit, OnDestroy {
  output: string;
  lastResult: string;
  error: string;
  private outputSub: Subscription;
  private resultSub: Subscription;

  constructor(private calcService: CalculatorService) { }

  ngOnInit(): void {
    this.output = "0";
    this.outputSub = this.calcService.outputSubject.pipe(map((output: string) => {
      if (output.startsWith('Error'))
        return output;
      let parsedNumber = Number.parseFloat(output);
      let transformedNumber = parsedNumber.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 7 })
      if (parsedNumber.toString() !== output)
        transformedNumber += output.slice(parsedNumber.toString().length);
      return transformedNumber;
    })).subscribe({
      next: (output: string) => {
        if (output.startsWith("Error")) {
          this.error = output;
          setTimeout(() => {
            this.error = "";
          }, 4000);
        } else {
          this.output = output;
        }
      },
    });

    this.resultSub = this.calcService.resultSubject.pipe(map((result: string) => {
      if (result === "")
        return result;
      return Number.parseFloat(result.slice(0, -1)).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 7 }) + result.slice(-1);
    })).subscribe((result: string) => {
      this.lastResult = result;
    });
  }

  ngOnDestroy(): void {
    this.outputSub.unsubscribe();
    this.resultSub.unsubscribe();
  }

}
