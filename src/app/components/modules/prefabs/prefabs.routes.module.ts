// nombre-feature-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeaponsComponent } from './weapons/weapons.component';
import { WeaponDetailComponent } from './weapons/weapon-detail/weapon.component';
import { AttiresComponent } from './attires/attires.component';
import { AttireDetailComponent } from './attires/attire-detail/attire-detail.component';
import { ItemsComponent } from './items/items.component';

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
  {
    path: 'attires',
    component: AttiresComponent,
  },
  { path: 'attires/:id', component: AttireDetailComponent },
  {
    path: 'items',
    component: ItemsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrefabsRoutingModule {}
