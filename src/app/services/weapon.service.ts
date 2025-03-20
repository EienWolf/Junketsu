import { Injectable } from '@angular/core';
import { Weapon } from '../models/weapon.model';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class WeaponService {
  constructor(private readonly supabase: SupabaseService) {
    if (this.supabase.session) {
      const { user } = this.supabase.session;
      // let profile: Profile;
      this.supabase.profile(user).then((data) => {
        if (data?.data?.config_url) {
          this.supabase
            .downLoadConfig(data?.data?.config_url)
            .then((config) => {
              console.log(config.data);
            });
        }
      });
    }
    this.loadFromLocalStorage();
  }
  private loadFromLocalStorage() {
    const storedWeaponsJson = localStorage.getItem('weapons') || '';
    this.weapons = storedWeaponsJson
      ? JSON.parse(storedWeaponsJson).map((data: any) => new Weapon(data))
      : [];
  }
  private saveToLocalStorage() {
    const serializedWeapons = this.weapons.map((weapon) => weapon.toJSON());
    const dataStr = JSON.stringify(serializedWeapons, null, 2);
    if (this.supabase.session) {
      const blob = new Blob([dataStr], { type: 'application/json' });
      const file = new File([blob], 'config.json');
      this.supabase.uploadConfig(file);
    }
    localStorage.setItem('weapons', dataStr);
  }

  private weapons: Weapon[] = [];
  getWeapon(index: string | number): Weapon {
    return (
      this.weapons.find(
        (weapon) => weapon.id.toString() === index.toString(),
      ) || new Weapon()
    );
  }
  getWeapons(): Weapon[] {
    return this.weapons;
  }

  addWeapon(weapon: Weapon) {
    this.weapons.push(weapon);
    this.saveToLocalStorage();
  }

  updateWeapon(weapon: Weapon) {
    const index = this.weapons.findIndex((w) => w.id === weapon.id);
    if (index !== -1) {
      this.weapons[index] = weapon;
    } else {
      this.addWeapon(weapon);
    }
    this.saveToLocalStorage();
  }

  deleteWeapon(index: string | number) {
    this.weapons = this.weapons.filter((weapon) => weapon.id !== index);
    this.saveToLocalStorage();
  }

  exportWeapons() {
    const serializedWeapons = this.weapons.map((weapon) => weapon.toJSON());
    const dataStr = JSON.stringify(serializedWeapons, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'weapons.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  importWeapons(event: any, mode: 'replace' | 'add' | 'update' | 'merge') {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const importedWeapons = JSON.parse(reader.result as string);
        if (!Array.isArray(importedWeapons)) {
          alert('');
          return;
        }
        switch (mode) {
          case 'replace':
            this.weapons = importedWeapons.map((data: any) => new Weapon(data));
            break;

          case 'add':
            importedWeapons.forEach((weaponData: any) => {
              const exists = this.weapons.some(
                (w) => w.id.toString() === weaponData.id.toString(),
              );
              if (!exists) {
                this.weapons.push(new Weapon(weaponData));
              }
            });
            break;

          case 'update':
            importedWeapons.forEach((weaponData: any) => {
              const index = this.weapons.findIndex(
                (w) => w.id.toString() === weaponData.id.toString(),
              );
              if (index !== -1) {
                this.weapons[index] = new Weapon(weaponData);
              }
            });
            break;
          case 'merge':
            importedWeapons.forEach((weaponData: any) => {
              const index = this.weapons.findIndex(
                (w) => w.id.toString() === weaponData.id.toString(),
              );
              if (index !== -1) {
                this.weapons[index] = new Weapon(weaponData);
              } else {
                this.weapons.push(new Weapon(weaponData));
              }
            });
            break;
        }
        this.saveToLocalStorage();
      } catch  {
      }
    };
    reader.readAsText(file);
  }
}
