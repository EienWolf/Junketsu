import { Routes } from '@angular/router';
import { WeaponFormComponent } from './components/weapon-form/weapon-form.component';
import { WeaponComponent } from './components/weapon/weapon.component';

export const routes: Routes = [
    { path: 'weapons', component: WeaponFormComponent },
    { path: 'weapons/:index', component: WeaponComponent }
];
