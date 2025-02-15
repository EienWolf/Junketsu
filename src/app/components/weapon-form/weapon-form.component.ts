import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Weapon, Attack } from '../../models/weapon.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weapon-form',
  templateUrl: './weapon-form.component.html',
  styleUrls: ['./weapon-form.component.css'],
  imports: [FormsModule, CommonModule]
})
export class WeaponFormComponent {
  weapons: Weapon[] = [];
  newWeapon: Weapon = this.resetWeapon();
  editingIndex: number | null = null;

  constructor() {
    this.loadWeapons();
  }

  saveWeapon() {
    if (this.editingIndex !== null) {
      this.weapons[this.editingIndex] = this.newWeapon ;
      this.editingIndex = null;
    } else {
      this.weapons.push(this.newWeapon);
    }
    this.saveToLocalStorage();
    this.newWeapon = this.resetWeapon();
  }

  editWeapon(index: number) {
    this.newWeapon = this.weapons[index] ;
    this.editingIndex = index;
  }

  deleteWeapon(index: number) {
    this.weapons.splice(index, 1);
    this.saveToLocalStorage();
  }

  addAttack() {
    this.newWeapon.attacks.push(new Attack({
      attack_name: '',
      stamina: 0,
      damage_type: '',
      damage_formula: '',
      ability: '',
      description: '',
      critical_success: '',
      is_basic: false,
      is_secondary: false
    }));
  }

  removeAttack(index: number) {
    this.newWeapon.attacks.splice(index, 1);
  }

  saveToLocalStorage() {
    localStorage.setItem('weapons', JSON.stringify(this.weapons));
  }

  loadWeapons() {
    const storedWeapons = localStorage.getItem('weapons');
    if (storedWeapons) {
      this.weapons = JSON.parse(storedWeapons);
    }
  }

  exportWeapons() {
    const dataStr = JSON.stringify(this.weapons, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'weapons.json';
    a.click();

    URL.revokeObjectURL(url);
  }

  importWeapons(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const importedWeapons = JSON.parse(reader.result as string);
        if (Array.isArray(importedWeapons)) {
          this.weapons = importedWeapons;
          this.saveToLocalStorage();
        } else {
          alert('Archivo JSON inválido');
        }
      } catch (error) {
        alert('Error al leer el archivo JSON');
      }
    };
    reader.readAsText(file);
  }

  resetWeapon(): Weapon {
    return new Weapon();
  }
}
