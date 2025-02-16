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
  
    get has_critical_success(): boolean {
      return !!this.critical_success?.trim();
    }

    get has_description(): boolean {
      return !!this.description?.trim();
    }
    
    get has_own_ability(): boolean {
      return this.weapon ? this.ability !== this.weapon.ability : false;
    }
  }
  
export class Weapon {
    private static REACH_REGEX = /^reach_(\d+)$/;

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
    attack_range: string = ''; //melee, reach_x, short, medium, large
    grip_mode: string = ''; //1h, 2h, 2hr
    wield_effect?: string; //Finesse, Versatile, Heavy
    ammo_capacity?: number;
    reloadrate?: number;
    attacks: Attack[];
    image?: string;
    id: string = '';

    constructor(data: Partial<Weapon> = {}) {
      this.name = data.name || '';
      this.durability = data.durability || 3;
      this.weapon_type = data.weapon_type || '';
      this.durability_type = data.durability_type || '';
      this.is_throwable = data.is_throwable || false;
      this.is_block = data.is_block || false;
      this.is_agile = data.is_agile || false;
      this.description = data.description || '';
      this.notes = data.notes || '';
      this.base_damage = data.base_damage || 1;
      this.ability = data.ability || '';
      this.attack_range = data.attack_range || '';
      this.grip_mode = data.grip_mode || '';
      this.wield_effect = data.wield_effect || '';
      this.attacks = data.attacks || [];
      this.image = data.image || '';
      this.id = data.id || '';
      this.ammo_capacity = data.ammo_capacity || 0;
      this.reloadrate = data.reloadrate || 0;
      this.attacks = (data.attacks || []).map(a => {
        const attack = new Attack(a);
        attack.weapon = this;
        return attack;
      });
    }

    get ammo_or_wield_effect(): string {
      return this.ammo_capacity ? 'ammo_capacity': 'wield_' + this.wield_effect;
    }
    get ammo_or_wield_effect_text(): string {
      return !!this.ammo_capacity ? 'Ammon Capacity': 'Wield Effect';
    }

    get range_type(): string {
      const match = Weapon.REACH_REGEX.test(this.attack_range);
      return match ? 'reach' : this.attack_range;
    }

    get has_range_value(): boolean {
      return this.attack_range != 'melee';
    }
    get range_value(): string {
      var value = '';
      switch (this.range_type) {
        case 'reach':
          const match = this.attack_range.match(Weapon.REACH_REGEX);
          value = match?.[1] ?? '';
          break;
        case 'short':
          value = 'S'
          break;
        case 'medium':
          value = 'M'
          break;
        case 'large':
          value = 'L'
          break;
      }
      return value;
    }

    get is_Guard(): boolean{
      return this.is_agile || this.is_block
    }

    get guard_type(): string{
      return this.is_agile && this.is_block ? 'property_guard' 
        : this.is_agile ? 'property_agile'
          : this.is_block ? 'property_block': 'property_block';
    }

    get is_long_description(): boolean {
      return (this.description?.length ?? 0) > 144;
    }
}