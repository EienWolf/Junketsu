import { Weapon } from './weapon.model';

interface CharacterInventory {
  id: string;
  core_id: string;
  quantity: number;
}

export class Character {
  /**
   * Inventario del personaje
   */
  inventory: CharacterInventory[];
  weapons: Weapon[];

  constructor(data: Partial<Character> = {}) {
    this.inventory = data.inventory ?? [];
    this.weapons = [];
  }

  toJSON() {
    const publicProps = Object.fromEntries(
      Object.entries(this).filter(
        ([key]) => !key.startsWith('#') && !key.startsWith('_'),
      ),
    );
    return {
      ...publicProps,
    };
  }
}
