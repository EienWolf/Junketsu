import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { WeaponService } from '../../services/weapon.service';
import { Weapon } from '../../models/weapon.model';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { WeaponCardA5VerticalComponent } from '../../utilities/print/weapon-card-a5-vertical/weapon.component';
import { SvgIconComponent } from '../../utilities/icon/icon.component';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.css'],
  imports: [
    SharedModule,
    WeaponCardA5VerticalComponent,
    SvgIconComponent,
    Dialog,
  ],
})
export class WeaponComponent implements OnInit, AfterViewInit {
  weapon: Weapon = new Weapon();
  visible: boolean = false;
  printOption: string = 'none';
  @ViewChild('pdf_vertical') pdfComponent!: WeaponCardA5VerticalComponent;
  constructor(
    private weaponService: WeaponService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.weapon = this.weaponService.getWeapon(param['index']);
    });
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  generatePDF() {
    this.printOption = 'a5Vertical';
    this.visible = true;
  }
}
