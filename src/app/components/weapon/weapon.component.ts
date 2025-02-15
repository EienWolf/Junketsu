import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeaponService } from '../../services/weapon.service';
import { Weapon } from '../../models/weapon.model';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.css'],
  imports: [CommonModule, SharedModule]
})
export class WeaponComponent implements OnInit {
  weapon: Weapon = new Weapon();

  constructor(private weaponService: WeaponService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const index = this.route.snapshot.paramMap.get('index');
    if (index !== null) {
      const storedWeaponsJson = localStorage.getItem('weapons');
      if (storedWeaponsJson) {
        const storedWeapons = JSON.parse(storedWeaponsJson);
        const storedWeaponsMap = storedWeapons.map((data: any) => new Weapon(data));
        this.weapon = storedWeaponsMap[0];
      }
    }
  }
}