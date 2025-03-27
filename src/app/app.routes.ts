import { Routes } from '@angular/router';
import { WeaponFormComponent } from './components/weapon-form/weapon-form.component';
import { WeaponComponent } from './components/weapon/weapon.component';
import { AuthComponent } from './components/auth/auth.component';
import { WikiComponent } from './components/wiki/wiki.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./components/modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'prefabs',
    loadChildren: () =>
      import('./components/modules/prefabs/prefabs.module').then(
        (m) => m.PrefabsModule,
      ),
  },

  { path: 'auth', component: AuthComponent },
  { path: 'weapons/:index', component: WeaponComponent },
  { path: 'wiki/:slug', component: WikiComponent },
  { path: 'wiki/tag/:slug', component: WikiComponent },
];
