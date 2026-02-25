import { Component, inject, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsDarkTheme } from './store/theme.selectors';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet />',
  styles: [],
})
export class AppComponent {
  private store = inject(Store);
  private document = inject(DOCUMENT);

  private isDark = this.store.selectSignal(selectIsDarkTheme);

  constructor() {
    effect(() => {
      const dark = this.isDark();
      const body = this.document.body;
      if (body) {
        if (dark) {
          body.classList.add('theme-dark');
        } else {
          body.classList.remove('theme-dark');
        }
      }
    });
  }
}
