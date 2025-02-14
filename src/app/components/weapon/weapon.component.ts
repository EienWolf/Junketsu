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
  weapon: Weapon = {
    name: '',
    durability: 0,
    weapon_type: '',
    description: '',
    base_damage: 1,
    attack_range: '',
    grip_mode: '',
    wield_effect: '',
    is_throwable: false,
    durability_type: '',
    is_agile: false,
    is_block: false,
    ability: '',
    notes: '',
    attacks: [],
    image: '',
    id: ''
  };

  constructor(private weaponService: WeaponService, private route: ActivatedRoute) {}

  ngOnInit() {
    const index = this.route.snapshot.paramMap.get('index');
    if (index !== null) {
      const storedWeapons = localStorage.getItem('weapons');
      if (storedWeapons) {
        const weapons: Weapon[] = JSON.parse(storedWeapons);
        this.weapon = weapons[+index];
      }
    }
  }
}