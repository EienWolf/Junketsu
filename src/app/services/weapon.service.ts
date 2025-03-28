import { Injectable } from '@angular/core';
import { Weapon } from '../models/weapon.model';
import { SupabaseService } from './supabase.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeaponService {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly http: HttpClient,
  ) {
    this.supabase.authChanges((a, b) => {
      if (b != null && a == 'INITIAL_SESSION') {
        const { user } = b;
        this.supabase.profile(user).then((data) => {
          if (data?.data?.config_url) {
            this.supabase
              .downLoadConfig(data?.data?.config_url)
              .then((config) => {
                config.data?.arrayBuffer().then((arrayBuffer) => {
                  const jsonString = new TextDecoder().decode(arrayBuffer);
                  console.log(jsonString);
                });
              });
          }
        });
      }
    });

    this.loadWeaponCoreData();
    this.loadFromLocalStorage();
  }

  loadWeaponCoreData() {
    return this.http
      .get('assets/data/weapons.json', { responseType: 'text' })
      .pipe(catchError(() => of([])))
      .subscribe({
        next: (dataStr) => {
          this.weapons.push(
            ...JSON.parse(dataStr.toString()).map(
              (data: Weapon) => new Weapon(data),
            ),
          );
        },
      });
  }

  private loadFromLocalStorage() {
    const storedWeaponsJson = localStorage.getItem('weapons') ?? '';
    this.weapons = storedWeaponsJson
      ? JSON.parse(storedWeaponsJson).map((data: Weapon) => new Weapon(data))
      : [];
  }

  private saveToLocalStorage() {
    const serializedWeapons = this.weapons
      .filter((w) => w.source != 'core')
      .map((weapon) => weapon.toJSON());
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
    weapon.source = 'user_[userid]';
    this.weapons.push(weapon);
    this.saveToLocalStorage();
  }

  updateWeapon(weapon: Weapon) {
    const index = this.weapons.findIndex((w) => w.id === weapon.id);
    if (index !== -1 && weapon.source != 'core') {
      this.weapons[index] = weapon;
    } else {
      weapon.source =
        weapon.source == 'core' ? 'edited_[coreid]_[userid]' : 'user_[userid]';
      this.addWeapon(weapon);
    }
    this.saveToLocalStorage();
  }

  deleteWeapon(index: string | number) {
    const weapon = this.weapons.find((weapon) => weapon.id == index);
    if (weapon?.source == 'core') {
      return;
    }
    this.weapons = this.weapons.filter((weapon) => weapon.id !== index);
    this.saveToLocalStorage();
  }

  exportWeapons() {
    const serializedWeapons = this.weapons
      .filter((w) => w.source != 'core')
      .map((weapon) => weapon.toJSON());
    const dataStr = JSON.stringify(serializedWeapons, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'weapons.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  importWeapons(
    event: HTMLInputElement,
    mode: 'replace' | 'add' | 'update' | 'merge',
  ) {
    const file = event.files?.[0];
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
            this.weapons = importedWeapons.map(
              (data: Weapon) => new Weapon(data),
            );
            break;

          case 'add':
            importedWeapons.forEach((weaponData: Weapon) => {
              const exists = this.weapons.some(
                (w) => w.id.toString() === weaponData.id.toString(),
              );
              if (!exists) {
                this.weapons.push(new Weapon(weaponData));
              }
            });
            break;

          case 'update':
            importedWeapons.forEach((weaponData: Weapon) => {
              const index = this.weapons.findIndex(
                (w) => w.id.toString() === weaponData.id.toString(),
              );
              if (index !== -1) {
                this.weapons[index] = new Weapon(weaponData);
              }
            });
            break;
          case 'merge':
            importedWeapons.forEach((weaponData: Weapon) => {
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
      } catch (error) {
        alert('No se puedo leer el archivo. ' + error);
      }
    };
    reader.readAsText(file);
  }
}
