import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NavComponent } from './components/nav/nav.component';
import { PrimeNG } from 'primeng/config';
import { SupabaseService } from './services/supabase.service';
import { MyPreset } from '../mytheme';
import { Session } from '@supabase/supabase-js';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  DEFAULT_LANGUAGE: string = 'es_MX';
  session: Session | null = null;

  constructor(
    private readonly translate: TranslateService,
    private readonly primeng: PrimeNG,
    private readonly supabase: SupabaseService,
  ) {
    this.session = this.supabase.session;
    this.translate.setDefaultLang(this.DEFAULT_LANGUAGE);
    this.primeng.theme.set({
      preset: MyPreset,
      options: {
        darkModeSelector: '[data-theme="dark"]',
        cssLayer: {
          name: 'primeng',
          order: 'base, primeng, tailwind-utilities',
        },
      },
    });
  }

  ngOnInit() {
    this.supabase.authChanges((_, session) => (this.session = session));
  }
  title = 'junketsu';
}
