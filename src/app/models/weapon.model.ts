export class Attack {
    attack_name: string = '';
    stamina: number = 1;
    damage_type: string = '';
    damage_formula: string = '';
    ability?: string;
    description?: string;
    critical_success?: string;
    is_basic: boolean = false;
    is_secondary: boolean = false;
    weapon?: Weapon;

    constructor(data: Partial<Attack> = {}) {
      this.attack_name = data.attack_name || '';
      this.stamina = data.stamina || 1;
      this.damage_type = data.damage_type || '';
      this.damage_formula = data.damage_formula || '';
      this.ability = data.ability || '';
      this.description = data.description || '';
      this.critical_success = data.critical_success || '';
      this.is_basic = data.is_basic ?? false;
      this.is_secondary = data.is_secondary ?? false;
    }
  
    get isCriticalSuccess(): boolean {
      return !!this.critical_success?.trim();
    }
    get isAbilityDifferent(): boolean {
      return this.weapon ? this.ability !== this.weapon.ability : false;
    }
  }
  
export class Weapon {
    name: string = '';
    durability: number = 3;
    weapon_type: string = '';
    durability_type: string = '';
    is_throwable: boolean = false;
    is_block: boolean = false;
    is_agile: boolean = false;
    description?: string;
    notes?: string;
    base_damage: number = 1;
    ability?: string = '';
    attack_range: string = '';
    grip_mode: string = '';
    wield_effect?: string;
    magsize?: number;
    reloadrate?: number;
    attacks: Attack[];
    image?: string;
    id: string = '';

    constructor(data: Partial<Weapon> = {}) {
      Object.assign(this, data);
      this.attacks = (data.attacks || []).map(a => {
        const attack = new Attack(a);
        attack.weapon = this;
        return attack;
      });
    }
}