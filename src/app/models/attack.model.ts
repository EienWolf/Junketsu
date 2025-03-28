import { Ability, Weapon } from './weapon.model';

export class Attack {
  /**
   * Nombre del ataque
   */
  attack_name: string;

  /**
   * Stamina que gasta el ataque
   */
  stamina: number;

  /**
   * Ignorar de momento...
   */
  damage_type: string;

  /**
   * Valor por defecto {{base_damege}} + {{stat_modifier}}
   * {{base_damge}} se obtiene del arma
   * {{stat_modifier}} se obtiene de la habilidad
   */
  damage_formula: string;

  /**
   * Habilidad que se usa para realizar el ataque
   */
  ability: Ability;

  /**
   * Descripcion del ataque
   */
  description?: string;

  /**
   * Solo si este ataque tiene definido su propio super exito
   */
  critical_success?: string;

  /**
   * Si el ataque cuenta como ataque basico
   */
  is_basic: boolean;

  /**
   * Si el ataque puede ser usado en la accion secundaria
   */
  is_secondary: boolean;
  private readonly _weapon?: Weapon;

  constructor(
    data: Partial<Attack> = {},
    weapon: Weapon | undefined = undefined,
  ) {
    this.attack_name = data.attack_name ?? '';
    this.stamina = data.stamina ?? 1;
    this.damage_type = data.damage_type ?? '';
    this.damage_formula = data.damage_formula ?? '';
    this.ability = data.ability ?? Ability.MIGHT;
    this.description = data.description ?? '';
    this.critical_success = data.critical_success ?? '';
    this.is_basic = data.is_basic ?? false;
    this.is_secondary = data.is_secondary ?? false;
    if (weapon !== undefined) {
      this._weapon = weapon;
    }
  }

  get has_critical_success(): boolean {
    return !!this.critical_success?.trim();
  }

  get has_description(): boolean {
    return !!this.description?.trim();
  }

  get has_own_ability(): boolean {
    return this._weapon ? this.ability !== this._weapon.ability : false;
  }

  toJSON() {
    const publicProps = Object.fromEntries(
      Object.entries(this).filter(
        ([key]) => !key.startsWith('#') && !key.startsWith('_'),
      ),
    );
    return publicProps;
  }
}
