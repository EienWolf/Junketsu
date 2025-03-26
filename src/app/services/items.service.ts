import { Injectable } from '@angular/core';
import { Consumable } from '../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private consumables: Consumable[] = [];

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const storedData = localStorage.getItem('consumables');
    if (storedData) {
      this.consumables = JSON.parse(storedData);
    } else {
      // Cargar datos de ejemplo si no hay datos en localStorage
      this.loadDefaultData();
    }
  }

  private loadDefaultData(): void {
    // Aquí puedes cargar datos predeterminados o hacer una llamada HTTP
    import('../../../public/assets/data/items.json')
      .then((data) => {
        this.consumables = data.default;
        this.saveToLocalStorage();
      })
      .catch((error) => {
        console.error('Error loading default consumables data:', error);
      });
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('consumables', JSON.stringify(this.consumables));
  }

  getAllConsumables(): Consumable[] {
    return [...this.consumables];
  }

  getConsumableById(id: string): Consumable | undefined {
    return this.consumables.find((item) => item.id === id);
  }

  addConsumable(consumable: Consumable): void {
    this.consumables.push(consumable);
    this.saveToLocalStorage();
  }

  updateConsumable(updatedConsumable: Consumable): void {
    const index = this.consumables.findIndex(
      (item) => item.id === updatedConsumable.id,
    );
    if (index !== -1) {
      this.consumables[index] = updatedConsumable;
      this.saveToLocalStorage();
    }
  }

  deleteConsumable(id: string): void {
    this.consumables = this.consumables.filter((item) => item.id !== id);
    this.saveToLocalStorage();
  }

  getConsumablesByCategory(category: string): Consumable[] {
    return this.consumables.filter((item) => item.category === category);
  }

  getConsumablesByRarity(rarity: string): Consumable[] {
    return this.consumables.filter((item) => item.rarity === rarity);
  }
}
