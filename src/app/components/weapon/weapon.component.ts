import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeaponService } from '../../services/weapon.service';
import { Weapon } from '../../models/weapon.model';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { NgxPrintModule } from 'ngx-print';
import { WeaponCardA5VerticalComponent } from '../../utilities/print/weapon-card-a5-vertical/weapon.component';

@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.css'],
  imports: [CommonModule, SharedModule, NgxPrintModule, WeaponCardA5VerticalComponent]
})
export class WeaponComponent implements OnInit {
  weapon: Weapon = new Weapon();
  // a5card: WeaponCardA5VerticalComponent = new WeaponCardA5VerticalComponent();
  @ViewChild('pdfvertical') pdfContent!: WeaponCardA5VerticalComponent;

  constructor(private weaponService: WeaponService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const index = this.route.snapshot.paramMap.get('index');
    if (index !== null) {
      const storedWeaponsJson = localStorage.getItem('weapons');
      if (storedWeaponsJson) {
        const storedWeapons = JSON.parse(storedWeaponsJson);
        const storedWeaponsMap: Weapon[] = storedWeapons.map((data: any) => new Weapon(data));
        var weapon = storedWeaponsMap.find(weapon => weapon.id === index);
        if (!!weapon) {
          
        }
        this.weapon = weapon || new Weapon();
        console.log(this.weapon.id);
      }
    }
  }

  generatePDF() {
    this.pdfContent.generatePDF();
  }
}