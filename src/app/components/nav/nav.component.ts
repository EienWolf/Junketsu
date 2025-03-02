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
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'nav-bar',
  imports: [SharedModule, MenubarModule, SelectButtonModule, FormsModule, MenuModule, ButtonModule, FloatLabelModule, InputTextModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})

export class NavComponent implements OnInit { 
  current_theme: string;
  current_language: string;
  config_Items: MenuItem[] = [];
  login_Items: MenuItem[] = [];
  items: MenuItem[];

  constructor(@Inject(DOCUMENT) private document: Document, private translate: TranslateService, private weaponservice: WeaponService) {
    this.current_theme = this.detect_theme();
    this.current_language = this.detect_language();
    this.items = [
      {
        label: 'nav.items.weapon.label',
        icon: 'pi pi-shield',
        items: this.weaponservice.getWeapons().map(weapon => ({
          label: weapon.name,
          id: weapon.id,
          routerLink: '/weapons/' + weapon.id
        }))
      },
    ];
    this.items.find(m=> m.label == 'nav.items.weapon.label')?.items?.push(({
      label: 'Create new +',
      routerLink: '/weapons'
    }))

    this.config_Items = [{
      label: 'nav.config.language.label',
      icon: 'pi pi-globe',
      items: [{
        label: 'English',
        command: () => { this.change_language('en_US')}
        }, {
        label: 'Español',
        command: () => { this.change_language('es_MX')}
        }]
      }, {
        label: 'nav.config.theme.label',
        icon: 'pi pi-globe',
        items: [{
            label: 'nav.config.theme.light',
            command: () => { this.change_theme('light')}
          }, {
            label: 'nav.config.theme.dark',
            command: () => { this.change_theme('dark')}
          }, {
            label: 'nav.config.theme.os',
            command: () => { this.change_theme('os')}
          }]
        }, {
        label: 'nav.config.data.label',
        icon: 'pi pi-globe',
        items: [{
            label: 'nav.config.data.export',
            
          }, {
            label: 'nav.config.data.import',
            
          }]
        }, {
          label: 'nav.config.session.label',
          icon: 'pi pi-globe',
          items: [{
              label: 'nav.config.session.connect'
            }]
          }
      ];
  }

  ngOnInit(): void {
    this.detect_language();
    this.change_theme(this.current_theme);
  }

  change_theme(theme: string) {
    localStorage.setItem('theme', theme);
    if (theme == 'os') {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    const currentDataTheme = document.documentElement.getAttribute('data-theme');
    if (theme !== currentDataTheme) {
        document.documentElement.setAttribute('data-theme', theme);
    }
  }

  change_language(lang: string) {
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

  detect_theme():string {
    let current_theme = localStorage.getItem('theme');
    if (!current_theme) {
      current_theme = 'os'
      localStorage.setItem('theme', current_theme);
    }
    return current_theme;
  }

  detect_language():string {
    console.log(navigator);
    const current_lang = document.documentElement.getAttribute('lang');
    let lang = localStorage.getItem('language');
    if (lang == null) {
      const browserLang = navigator.language.replace('-', '_');
      lang = (browserLang.match(/es_MX|en_US/) ? browserLang : 'es_MX');
    }
    this.change_language(lang);
    return lang;
  }
}



