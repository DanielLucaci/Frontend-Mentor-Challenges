import { Directive, HostBinding, HostListener } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MainThemeService } from './main-theme.service';

@Directive({
  selector: '[appThemeDirective]'
})
export class ThemeDirectiveDirective implements OnInit, OnDestroy {
  @HostBinding('class.theme1') theme1: boolean = true;
  @HostBinding('class.theme2') theme2: boolean = false;
  @HostBinding('class.theme3') theme3: boolean = false;
  subsc: Subscription;

  constructor(private themeService: MainThemeService) { }

  ngOnInit() {
    this.subsc = this.themeService.themeChanged.subscribe({
      next: (value) => {
        this.theme1 = false;
        this.theme2 = false;
        this.theme3 = false;
        switch (value) {
          case 'Theme1':
            this.theme1 = true;
            break;
          case 'Theme2':
            this.theme2 = true;
            break;
          case 'Theme3':
            this.theme3 = true;
            break;
          default:
            break;
        }
      }
    })
  }


  ngOnDestroy() {
    this.subsc.unsubscribe();
  }
}
