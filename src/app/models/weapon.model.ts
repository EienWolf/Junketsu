export interface Attack {
    attack_name: string;
    stamina: number;
    damage_type: string;
    damage_formula: string;
    ability: string;
    description: string;
    critical_success: string;
    is_basic: boolean;
    is_secondary: boolean;
  }
  
export interface Weapon {
    name: string;
    durability: number;
    weapon_type: string;
    durability_type: string;
    is_throweable: boolean;
    is_block: boolean;
    is_agile: boolean;
    description: string;
    notes: string;
    base_damage: string;
    ability: string;
    attack_range: string;
    grip_mode: string;
    wield_effect: string;
    magsize?: number;
    reloadrate?: number;
    attacks: Attack[];
}