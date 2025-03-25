import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrefabsRoutingModule } from './prefabs.routes.module';
import { WeaponsComponent } from './weapons/weapons.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ScrollTopModule } from 'primeng/scrolltop';
import { TooltipModule } from 'primeng/tooltip';
import { routes } from '../../../app.routes';
import { SharedModule } from 'primeng/api';
import { Dialog, DialogModule } from 'primeng/dialog';
import { SvgIconComponent } from '../../../utilities/icon/icon.component';

import { ActivatedRoute } from '@angular/router';
import { WeaponService } from '../../../services/weapon.service';
import { WeaponCardA5VerticalComponent } from '../../../utilities/print/weapon-card-a5-vertical/weapon.component';
import { WeaponDetailComponent } from './weapons/weapon-detail/weapon.component';
import { TranslateModule } from '@ngx-translate/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@NgModule({
  declarations: [WeaponsComponent, WeaponDetailComponent],
  imports: [
    CommonModule,
    IconFieldModule,
    InputIconModule,
    FormsModule,
    RouterModule.forChild(routes),
    PrefabsRoutingModule,
    SharedModule,
    WeaponCardA5VerticalComponent,
    DialogModule,
    ButtonModule,
    TooltipModule,
    RippleModule,
    DropdownModule,
    ButtonModule,
    CardModule,
    DividerModule,
    DropdownModule,
    TooltipModule,
    BadgeModule,
    RippleModule,
    ScrollTopModule,
    SvgIconComponent,
    TranslateModule.forChild(),
    // PrimeNG
    DialogModule,
    ButtonModule,
    TooltipModule,
    RippleModule,
  ],
  providers: [WeaponService],
  exports: [WeaponDetailComponent],
})
export class PrefabsModule {}
