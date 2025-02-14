import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Weapon } from '../models/weapon.model';

@Injectable({
  providedIn: 'root'
})
export class WeaponService {
  constructor(private http: HttpClient) {}
  private weapons: Weapon[] = [];

  getWeapons(): Weapon[] {
    return this.weapons;
  }

  addWeapon(weapon: Weapon) {
    this.weapons.push(weapon);
  }
  getWeaponData(): Observable<any> {
    return this.http.get('assets/weapon-data.json');
  }
}