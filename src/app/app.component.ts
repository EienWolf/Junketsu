import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeaponComponent } from './components/weapon/weapon.component';
import { WeaponFormComponent } from './components/weapon-form/weapon-form.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WeaponComponent, WeaponFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('es_MX');
    this.detectLanguage();
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }

  detectLanguage() {
    const browserLang = navigator.language.replace('-', '_');
    const savedLang = localStorage.getItem('language');
    const langToUse = savedLang || (browserLang.match(/es_MX|en_US/) ? browserLang : 'es_MX');
    this.changeLanguage(langToUse);
  }
  title = 'junketsu';
}
