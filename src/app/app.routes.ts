import { Routes } from '@angular/router';
import { WeaponFormComponent } from './components/weapon-form/weapon-form.component';
import { WeaponComponent } from './components/weapon/weapon.component';
import { AuthComponent } from './components/auth/auth.component';
import { WikiComponent } from './components/wiki/wiki.component';

export const routes: Routes = [
  { path: 'weapons', component: WeaponFormComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'weapons/:index', component: WeaponComponent },
  { path: 'wiki/:route', component: WikiComponent },
];
