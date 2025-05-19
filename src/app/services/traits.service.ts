import { Injectable } from '@angular/core';

// ability.model.ts
export interface Ability {
  id: string;
  name: string;
  description: string;
  effect: string;
  special: string;
  prerequisite: string;
  type: string;
  cost: number;
  image: string;
}

export enum AbilityType {
  COMBAT = 'Combat',
  DEFENSE = 'Defense',
  PASSIVE = 'Passive',
  KNOWLEDGE = 'Knowledge',
  EXPLORATION = 'Exploration',
  STEALTH = 'Stealth',
  SUPPORT = 'Support',
  SURVIVAL = 'Survival',
  CRAFTING = 'Crafting',
  MENTAL = 'Mental',
  MOVEMENT = 'Movement',
  TRACKING = 'Tracking',
  HEALING = 'Healing',
  SOCIAL = 'Social',
  RITUAL = 'Ritual',
}

// Servicio para gestionar las habilidades
export class TraitsService {
  private abilities: Ability[] = [];

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const storedData = localStorage.getItem('abilities');
    if (storedData) {
      this.abilities = JSON.parse(storedData);
    } else {
      // Cargar datos de ejemplo si no hay datos en localStorage
      this.loadDefaultData();
    }
  }

  private loadDefaultData(): void {
    // Aquí puedes cargar datos predeterminados o hacer una llamada HTTP
    import('./../../../public/assets/data/traits.json')
      .then((data) => {
        this.abilities = data.default;
        this.saveToLocalStorage();
      })
      .catch((error) => {
        console.error('Error loading default abilities data:', error);
      });
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('abilities', JSON.stringify(this.abilities));
  }

  getAllAbilities(): Ability[] {
    return [...this.abilities];
  }

  getAbilityById(id: string): Ability | undefined {
    return this.abilities.find((item) => item.id === id);
  }

  addAbility(ability: Ability): void {
    this.abilities.push(ability);
    this.saveToLocalStorage();
  }

  updateAbility(updatedAbility: Ability): void {
    const index = this.abilities.findIndex(
      (item) => item.id === updatedAbility.id,
    );
    if (index !== -1) {
      this.abilities[index] = updatedAbility;
      this.saveToLocalStorage();
    }
  }

  deleteAbility(id: string): void {
    this.abilities = this.abilities.filter((item) => item.id !== id);
    this.saveToLocalStorage();
  }

  getAbilitiesByType(type: string): Ability[] {
    return this.abilities.filter((item) => item.type === type);
  }

  getAbilitiesByPrerequisite(prerequisite: string): Ability[] {
    return this.abilities.filter((item) =>
      item.prerequisite.includes(prerequisite),
    );
  }
}
