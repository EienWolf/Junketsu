import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AttireService } from '../../../../../services/attire.service';
interface Resistance {
  type: string;
  value: number;
}

@Component({
  selector: 'app-attire-detail',
  templateUrl: './attire-detail.component.html',
  styleUrl: './attire-detail.component.css',
  standalone: false,
})
export class AttireDetailComponent {
  @ViewChild('pdf_vertical') pdfComponent: any;

  attire: any = {};
  printOption: string = 'none';
  visible: boolean = false;

  constructor(
    private readonly attireService: AttireService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const attireId = params['id'];
      this.loadAttire(attireId);
    });
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  loadAttire(id: string): void {
    this.attireService.getAttire(id).subscribe({
      next: (response) => {
        this.attire = response;
      },
    });

    if (!this.attire || !this.attire.id) {
      console.error(`Attire with id ${id} not found`);
      this.router.navigate(['/attires']);
      return;
    }
  }

  generatePDF(): void {}

  getFullResistances(attire: any): Resistance[] {
    if (!attire || !attire.resistances) return [];

    // Return all resistances as an array
    return Object.entries(attire.resistances).map(([type, value]) => ({
      type,
      value: value as number,
    }));
  }

  getResistanceIcon(type: string): string {
    switch (type.toLowerCase()) {
      // Daño físico
      case 'physical':
        return 'ra-broken-shield';
      case 'slashing':
        return 'ra-sword';
      case 'piercing':
        return 'ra-broadhead-arrow';
      case 'blunt':
        return ' ra-flat-hammer';
      case 'crushing':
        return 'ra-hammer-drop ';

      // Daño elemental
      case 'fire':
        return 'ra-fire';
      case 'lightning':
        return 'ra-lightning-bolt';
      case 'frost':
        return 'ra-snowflake';
      case 'poison':
        return 'ra-fizzing-flask';
      case 'acid':
        return 'ra-splash';

      // Daño arcano/eldritch
      case 'arcane':
        return 'ra-burning-eye';
      case 'cosmic':
        return 'ra-galaxy';
      case 'blood':
        return 'ra-dripping-blade';
      case 'frenzy':
        return 'ra-bleeding-eye';

      // Daño por estado
      case 'bleed':
        return 'ra-bleeding-hearts';
      case 'curse':
        return 'ra-death-skull';
      case 'toxicity':
        return 'ra-biohazard';
      case 'decay':
        return ' ra-death-skull';

      // Daño único/eldritch
      case 'madness':
        return 'ra-brain-freeze';
      case 'abyssal':
        return 'ra-interdiction';

      // Valor por defecto
      default:
        return 'ra-shield';
    }
  }

  getStaminaText(value: number): string {
    switch (value) {
      case -1:
        return 'Reduced';
      case 0:
        return 'Normal';
      case 1:
        return 'Enhanced';
      default:
        return 'Unknown';
    }
  }

  getStaminaDescription(value: number): string {
    switch (value) {
      case -1:
        return 'Slows stamina recovery rate by 1 point';
      case 0:
        return 'Standard stamina recovery rate';
      case 1:
        return 'Increases stamina recovery rate by 1 point';
      default:
        return '';
    }
  }

  getWeightClassDescription(weightClass: string): string {
    switch (weightClass.toLowerCase()) {
      case 'light':
        return 'Allows quick movement and dodging';
      case 'medium':
        return 'Balanced protection and mobility';
      case 'heavy':
        return 'Maximum protection, Disvantage to Reflexes throws';
      default:
        return '';
    }
  }
}
