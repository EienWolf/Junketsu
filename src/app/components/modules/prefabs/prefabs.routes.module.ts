// nombre-feature-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeaponsComponent } from './weapons/weapons.component';
import { WeaponDetailComponent } from './weapons/weapon-detail/weapon.component';

// Importa los componentes de este módulo

// Opcional: Importa guardias de rutas si los necesitas
// import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  // Ruta principal del módulo
  {
    path: 'weapons',
    component: WeaponsComponent,
  },
  { path: 'weapons/:index', component: WeaponDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrefabsRoutingModule {}
