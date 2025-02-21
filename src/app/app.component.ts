import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NavComponent } from "./components/nav/nav.component";
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  DEFAULT_LANGUAGE:string = 'es_MX';
  constructor(@Inject(DOCUMENT) private document: Document, private translate: TranslateService) {
    this.translate.setDefaultLang(this.DEFAULT_LANGUAGE);
    this.detectLanguage();
  }

  changeLanguage(lang: string) {
    let languages = ['es_MX', 'en_US'];
    if (!languages.some(m => m == lang)) {
      localStorage.setItem('language', (this.translate.currentLang || this.translate.defaultLang));
      return;
    }
    if ((this.translate.currentLang || this.translate.defaultLang) != lang) {
      this.translate.use(lang);
    }
    localStorage.setItem('language', lang);
  }

  detectLanguage() {
    let lang = localStorage.getItem('language');
    if (lang == null) {
      const browserLang = navigator.language.replace('-', '_');
      lang = (browserLang.match(/es_MX|en_US/) ? browserLang : 'es_MX');
    }
    this.changeLanguage(lang);
  }
  title = 'junketsu';
}
