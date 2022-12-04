import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainThemeService {
  themeChanged: Subject<string> = new Subject();
  
  constructor() { }

  setTheme(theme: string) {
    this.themeChanged.next(theme);
  }
}
