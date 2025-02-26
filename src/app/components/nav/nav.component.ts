import { Component, Inject, OnInit } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItemContent, MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { WeaponService } from '../../services/weapon.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'nav-bar',
  imports: [SharedModule, MenubarModule, SelectButtonModule, FormsModule, MenuModule, ButtonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})

export class NavComponent implements OnInit { 
  // DEFAULT_THEME: string = 'light';
  // DEFAULT_LANGUAGE: string = 'es_MX';

  languages = [
    { label: 'English (US)', value: 'en_US' },
    { label: 'Spanish', value: 'es_MX' },
  ];
  selectedLanguage = this.languages[1];

  themes = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' }
  ];
  selectedTheme = this.themes[0];

  items: MenuItem[];

  lang_items: MenuItem[] = [
    {
      label: 'English',
      routerLink: '/weapons',
    },
    {
      label: 'Spanish',
      routerLink: '/weapons',
    },
  ];

  constructor(@Inject(DOCUMENT) private document: Document, private translate: TranslateService, private weaponservice: WeaponService) {
    this.items = [
      {
        label: 'Weapons',
        icon: 'pi pi-fw pi-shield',
        items: this.weaponservice.getWeapons().map(weapon => ({
          label: weapon.name,
          id: weapon.id,
          routerLink: '/weapons/' + weapon.id
        }))
      },
    ];
    this.items.find(m=> m.label == 'Weapons')?.items?.push(({
      label: 'Create new +',
      routerLink: '/weapons'
    }))
  }

  ngOnInit(): void {
    this.detectLanguage();
    let current_theme = localStorage.getItem('theme') || '';
    this.change_theme(current_theme);
  }

  changeLanguage() {
    this.changeLanguageV2(this.selectedLanguage.value);
  }

  changeTheme() {
    this.change_theme(this.selectedTheme.value);
  }

  change_theme(theme: string) {
    let current_theme = localStorage.getItem('theme');
    if (!current_theme) {
        current_theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "";
        localStorage.setItem('theme', current_theme);
    }

    const currentDataTheme = document.documentElement.getAttribute('data-theme');
    if (current_theme !== currentDataTheme) {
        document.documentElement.setAttribute('data-theme', current_theme);
    }

    if (current_theme !== theme) {
        localStorage.setItem('theme', theme);
        if (theme === 'light') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', theme);
        }
    }
  }

  changeLanguageV2(lang: string) {
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
    this.changeLanguageV2(lang);
  }
}



