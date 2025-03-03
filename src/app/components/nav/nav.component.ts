import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { TranslateService } from '@ngx-translate/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { WeaponService } from '../../services/weapon.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'nav-bar',
  imports: [SharedModule, MenubarModule, SelectButtonModule, FormsModule, MenuModule, ButtonModule, FloatLabelModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NavComponent implements OnInit { 
  current_theme: string;
  current_language: string;
  config_Items: MenuItem[] = [];
  login_Items: MenuItem[] = [];
  items: MenuItem[];
  email_form: FormGroup;
  loading: boolean = false;
  is_login: boolean = false;

  constructor(private cdr: ChangeDetectorRef
    , private translate: TranslateService
    , private weapon_service: WeaponService
    , private supabase: SupabaseService
    , private fb: FormBuilder) {
      
    this.email_form = this.fb.group({
          email: ['', [Validators.required, Validators.email]]});
    this.current_theme = this.detect_theme();
    this.current_language = this.detect_language();
    this.supabase.authChanges((a,b) => {this.is_login = b != null; this.cdr.markForCheck(); } );
    this.items = [
      {
        label: 'nav.items.weapon.label',
        icon: 'pi pi-shield',
        items: this.weapon_service.getWeapons().map(weapon => ({
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
        id: 'en_US',
        command: () => { this.change_language('en_US')}
        }, {
        label: 'Español',
        id: 'es_MX',
        command: () => { this.change_language('es_MX')}
        }]
      }, {
        label: 'nav.config.theme.label',
        icon: 'pi pi-globe',
        items: [{
            label: 'nav.config.theme.light',
            id: 'light',
            command: () => { this.change_theme('light')}
          }, {
            label: 'nav.config.theme.dark',
            id: 'dark',
            command: () => { this.change_theme('dark')}
          }, {
            label: 'nav.config.theme.os',
            id: 'os',
            command: () => { this.change_theme('os')}
          }]
        }, {
        label: 'nav.config.data.label',
        icon: 'pi pi-globe',
        items: [{
            label: 'nav.config.data.export',
            command: () => { this.export()}
          }, {
            label: 'nav.config.data.import',
            command: () => { this.import()}
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
  import() {
    //this.weapon_service.importWeapons()
  }
  export() {
    this.weapon_service.exportWeapons();
  }

  isSelected(item: any): boolean {
    if (item.id) {
      if (this.themeItems.some(i => i.id === item.id)) {
        return item.id === this.current_theme;
      }
      if (this.languageItems.some(i => i.id === item.id)) {
        return item.id === this.current_language;
      }
    }
    return false;
  }
  
  get themeItems() {
    return this.config_Items.find(i => i.label === 'nav.config.theme.label')?.items || [];
  }
  
  get languageItems() {
    return this.config_Items.find(i => i.label === 'nav.config.language.label')?.items || [];
  }

  ngOnInit(): void {
    this.detect_language();
    this.change_theme(this.current_theme);
  }

  async login_email(){
    try {
      this.loading = true
      const email = this.email_form.value.email as string
      const { error } = await this.supabase.signIn(email)
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.email_form.reset()
      this.loading = false;
      this.cdr.markForCheck();
    }
  }

  async logout(){
    console.log("slkusklujsljk");
    const { error } = await this.supabase.signOut()
    this.cdr.markForCheck();
  }
  login_github(): void{
    this.supabase.signIn('');
  }
  login_google(): void{
    this.supabase.signIn('');
  }
  login_discord(): void{
    this.supabase.signIn('');
  }


  change_theme(theme: string) {
    this.current_theme = theme;
    localStorage.setItem('theme', theme);
    if (theme == 'os') {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    const currentDataTheme = document.documentElement.getAttribute('data-theme');
    if (theme !== currentDataTheme) {
      document.documentElement.setAttribute('data-theme', theme);
      this.cdr.markForCheck();
    }
  }

  change_language(lang: string) {
    this.current_language = lang;
    let languages = ['es_MX', 'en_US'];
    if (!languages.some(m => m == lang)) {
      localStorage.setItem('language', (this.translate.currentLang || this.translate.defaultLang));
      return;
    }
    if ((this.translate.currentLang || this.translate.defaultLang) != lang) {
      this.translate.use(lang);
      this.cdr.markForCheck();
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



