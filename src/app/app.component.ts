import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NavComponent } from "./components/nav/nav.component";
import { DOCUMENT } from '@angular/common';
import { PrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  DEFAULT_LANGUAGE:string = 'es_MX';
  constructor(@Inject(DOCUMENT) private document: Document, private translate: TranslateService
    , private primeng: PrimeNG) {
    this.translate.setDefaultLang(this.DEFAULT_LANGUAGE);
    this.primeng.theme.set({
      preset: Aura,
          options: {
            darkModeSelector: '[data-theme="dark"]',
              cssLayer: {
                  name: 'primeng',
                  order: 'base, primeng, tailwind-utilities'
              }
          }
      });
  }
  title = 'junketsu';
}
