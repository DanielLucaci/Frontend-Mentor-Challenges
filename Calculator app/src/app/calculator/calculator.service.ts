import { Subject } from "rxjs";

export class CalculatorService {
  number: number;
  result: number;
  operator: string;
  output: string;
  outputSubject: Subject<string>;
  resultSubject: Subject<string>;

  constructor() {
    this.number = 0;
    this.result = 0;
    this.output = "0";
    this.outputSubject = new Subject();
    this.resultSubject = new Subject();
  }

  keyPressed(key: string) {
    switch (key) {
      // Number 
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        if (this.checkMaximumLength())
          return;
        this.sendOutput(this.output === '0' ? key : this.output + key);
        break;
      case '.':
        if (this.checkMaximumLength())
          return;
        (this.output.includes('.'))
          ? this.sendError('Error: Dot was already added')
          : this.sendOutput(this.output + '.');
        break;
      // Operators 
      case '+':
      case '-':
      case 'x':
      case '/':
        this.computeResult();
        this.operator = key;
        this.number = 0;
        this.sendOutput("0");
        this.sendResult(this.result + this.operator);
        break;
      case '=': // '=' was pressed
        this.computeResult();
        this.operator = null;
        this.sendOutput(this.result.toString());
        this.sendResult("");
        this.number = this.result;
        this.result = 0;
        break;
      case 'DEL': // 'DEL' was pressed
        if (this.output !== "0")
          this.sendOutput((this.output.length !== 1) ? this.output.slice(0, -1) : '0');
        break;
      case 'RESET': // 'RESET' was pressed 
        this.reset();
        break;
    }
  }

  private computeResult(): void {
    this.number = Number.parseFloat(this.output);
    if (!this.operator) {
      this.result = this.number;
    } else {
      switch (this.operator) {
        case '+':
          this.result += this.number;
          break;
        case 'x':
          this.result *= this.number;
          break;
        case '-':
          this.result -= this.number;
          break;
        case '/':
          this.result /= this.number;
          break;
        default:
          break;
      }
    }
    this.result = Number.parseFloat(this.result.toString().slice(0, 9).replace(/\.$/g, ""));
  }

  private reset(): void {
    this.sendOutput("0");
    this.sendResult("");
    this.result = this.number = 0;
    this.operator = '';
  }

  private checkMaximumLength(): boolean {
    if (this.output.length >= 9) {
      this.sendError("Error: Number cannot have more than 9 symbols");
      return true;
    }
    return false;
  }

  private sendError(errorMessage: string): void {
    this.outputSubject.next(errorMessage);
  }

  private sendOutput(newOutput: string): void {
    this.output = newOutput;
    this.outputSubject.next(this.output);
  }

  private sendResult(result: string): void {
    this.resultSubject.next(result);
  }
}