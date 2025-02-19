import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Weapon, Attack } from '../../models/weapon.model';
import { SharedModule } from '../../shared.module';
import { WeaponService } from '../../services/weapon.service';


@Component({
  selector: 'app-weapon-form',
  templateUrl: './weapon-form.component.html',
  styleUrls: ['./weapon-form.component.css'],
  imports: [FormsModule, SharedModule]
})
export class WeaponFormComponent {
  weapons: Weapon[] = [];
  newWeapon: Weapon = this.resetWeapon();
  is_editing: boolean = false;

  constructor(private weaponService: WeaponService) {
    this.weapons = weaponService.getWeapons();
  }

  saveWeapon() {
    this.weaponService.updateWeapon(this.newWeapon);
    this.newWeapon = this.resetWeapon();
    this.is_editing = false;
  }

  editWeapon(index: number | string) {
    this.newWeapon = this.weaponService.getWeapon(index);
    this.is_editing = true;
  }

  deleteWeapon(index: number | string) {
    this.weaponService.deleteWeapon(index);
  }

  addAttack() {
    this.newWeapon.attacks.push(new Attack());
  }

  removeAttack(index: number) {
    this.newWeapon.attacks.splice(index, 1);
  }

  exportWeapons() {
    this.weaponService.exportWeapons();
  }

  importWeapons(event: any) {
    this.weaponService.importWeapons(event, 'replace');
  }

  resetWeapon(): Weapon {
    return new Weapon();
  }
}
