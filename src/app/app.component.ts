import { Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NavComponent } from "./components/nav/nav.component";
import { DOCUMENT } from '@angular/common';
import { PrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { SupabaseService } from './services/supabase.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  DEFAULT_LANGUAGE:string = 'es_MX';
  session:any;

  constructor(@Inject(DOCUMENT) private document: Document, private translate: TranslateService
    , private primeng: PrimeNG, private readonly supabase: SupabaseService) {
    this.session = this.supabase.session;
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

  ngOnInit() {
    this.supabase.authChanges((_, session) => (this.session = session))
  }
  title = 'junketsu';
}
