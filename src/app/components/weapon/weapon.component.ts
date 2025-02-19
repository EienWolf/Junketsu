import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { WeaponService } from '../../services/weapon.service';
import { Weapon } from '../../models/weapon.model';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { WeaponCardA5VerticalComponent } from '../../utilities/print/weapon-card-a5-vertical/weapon.component';

@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.css'],
  imports: [SharedModule, WeaponCardA5VerticalComponent],
})
export class WeaponComponent implements OnInit, AfterViewInit {
  weapon: Weapon = new Weapon();
  printOption: string = 'none';
  @ViewChild('pdfvertical') pdfComponent!: WeaponCardA5VerticalComponent;
  constructor(private weaponService: WeaponService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {
  }

  async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  ngOnInit(): void {
    const index = this.route.snapshot.paramMap.get('index') || '';
    this.weapon = this.weaponService.getWeapon(index);
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges(); 
  }

  generatePDF() {
    this.printOption = 'a5Vertical';
    setTimeout(() => {
      if (this.pdfComponent) {
        this.pdfComponent.generatePDF();
        this.printOption = 'none';
      }
    }, 0);
    
  }
}