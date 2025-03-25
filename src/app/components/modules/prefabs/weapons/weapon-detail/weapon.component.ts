// weapon-detail.component.ts
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeaponService } from '../../../../../services/weapon.service';
import { Weapon } from '../../../../../models/weapon.model';
@Component({
  selector: 'app-weapon-detail',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.scss'],
  standalone: false,
})
export class WeaponDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('pdf_vertical') pdfVertical: any;

  weapon: Weapon = new Weapon(); // Utilizamos el modelo Weapon en lugar de any
  visible: boolean = false;
  printOption: string = 'a5Vertical';

  constructor(
    private readonly weaponService: WeaponService,
    private readonly route: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.weapon = this.weaponService.getWeapon(param['index']);

      // Asegúrate de preparar datos adicionales si tu modelo no los incluye
      this.prepareWeaponData();
    });
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  // Prepara datos adicionales necesarios para la visualización
  prepareWeaponData(): void {
    // Propiedad para comprobar si la descripción es larga

    // Asegurar que attacks es un array
    if (!this.weapon.attacks || !Array.isArray(this.weapon.attacks)) {
      this.weapon.attacks = [];
    }

    // Procesar cada ataque
    this.weapon.attacks.forEach((attack: any) => {
      attack.has_own_ability = !!attack.ability;
      attack.has_description = !!attack.description;
      attack.has_critical_success = !!attack.critical_success;
    });
  }

  // Método para generar el PDF
  generatePDF(): void {
    this.printOption = 'a5Vertical';
    this.visible = true;

    // Esperar a que el diálogo se muestre y el componente de PDF se inicialice
    setTimeout(() => {
      if (this.pdfVertical) {
        this.pdfVertical.generatePDF();
      }
    }, 500);
  }

  // Método para volver atrás
  goBack(): void {
    this.router.navigate(['/weapons']);
  }
}
