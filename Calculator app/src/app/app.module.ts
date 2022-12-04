import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CalculatorHeaderComponent } from './calculator/calculator-header/calculator-header.component';
import { CalculatorMainComponent } from './calculator/calculator-main/calculator-main.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { AttributionComponent } from './attribution/attribution.component';
import { CalculatorScreenComponent } from './calculator/calculator-screen/calculator-screen.component';
import { CalculatorService } from './calculator/calculator.service';
import { BrowserModule } from '@angular/platform-browser';
import { ThemeDirectiveDirective } from './calculator/theme-directive.directive';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    CalculatorMainComponent,
    CalculatorHeaderComponent,
    CalculatorScreenComponent,
    AttributionComponent,
    ThemeDirectiveDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [CalculatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
