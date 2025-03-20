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

/**
 *
 */
export enum Durability_Type {
  /**
   *
   */
  Legacy = 'legacy',

  /**
   *
   */
  Regular = 'regular',

  /**
   *
   */
  Scrap = 'scrap',
}

/**
 *
 */
export enum Ability {
  /**
   *
   */
  MIGHT = 'might',

  /**
   *
   */
  PRECISION = 'precision',

  /**
   *
   */
  FOCUS = 'focus',

  /**
   *
   */
  EVOKE = 'evoke',
}

/**
 *
 */
export enum Attack_Range {
  /**
   *
   */
  MELEE = 'melee',

  /**
   *
   */
  REACH = 'reach',

  REACH2 = 'reach2',

  /**
   *
   */
  SHORT = 'short',

  /**
   *
   */
  MEDIUM = 'medium',

  /**
   *
   */
  LARGE = 'large',
}

/**
 *
 */
export enum Grip_Mode {
  /**
   *
   */
  FREE_HAND = '0h',

  /**
   *
   */
  ONE_HAND = '1h',

  /**
   *
   */
  TWO_HAND = '2h',

  /**
   *
   */
  TWO_HAND_REQUIRED = '2hr',
}

/**
 *
 */
export enum Wield_Effect {
  /**
   *
   */
  LIGHT = 'light',

  /**
   *
   */
  VERSATILE = 'versatile',

  /**
   *
   */
  HEAVY = 'heavy',
}

/**
 *
 */
export enum Guard_Type {
  /**
   *
   */
  AGILE = 'agile',

  /**
   *
   */
  BLOCK = 'block',

  /**
   *
   */
  GUARD = 'guard',
}

export class Weapon {
  private static readonly REACH_REGEX = /^reach_(\d+)$/;
  /**
   * Id unico del arma.
   * @remarks Hay que validar que no se repita con otro ya existente.
   * @remarks Su valor por defecto es igual a la porpiedad @name, en minusculas sin espacios y sin caracteres especiales
   */
  id: string = '';

  /**
   * Nombre del arma
   * @minLength 2
   * @maxLength 100
   */
  name: string = '';

  /**
   * Descripcion corta del arma, especial para mostrar dentro de una tarjeta
   * @maxLength 144
   */
  short_description?: string;

  /**
   * Descripcion completa del arma
   */
  description?: string;

  /**
   * Ignorar de momento...
   */
  weapon_type?: string;

  /**
   * Tipo de durabilidad del arma
   */
  durability_type: Durability_Type;

  /**
   * Durabilidad numerica del arma
   * @remarks Su valor por defecto depende del tipo de durabilidad:
   * Durability_Type.SCRAP = 2
   * Durability_Type.REGULAR = 5
   * Durability_Type.LEGACY = 7
   * Si se coloca un valor en este campo se respeta independientemente del tipo de durabilidad
   */
  durability: number;

  /**
   * Indica si el rama puede hacer uso de las condiciones especiales de la accion Thrown
   */
  is_throwable: boolean;

  /**
   * Indica si el arma puede ser usada en la accion Block sin perder durabilidad
   * @remarks Si es verdadera junto con la propiedad de @is_agile se regeresa el Guard_Type.Guard en la propiedad @guard_type
   */
  is_block: boolean;

  /**
   * Indica si el arma puede ser usada en la accion riposte
   * @remarks Si es verdadera junto con la propiedad de @is_block se regeresa el Guard_Type.Guard en la propiedad @guard_type
   */
  is_agile: boolean;

  /**
   * Notas extra a añadir, indicaciones especiales, tengo un metodo de dynamics_Notes que agrega notas por defecto
   * dependiendo de las propiedades del arma
   */
  notes?: string;

  /**
   * Daño base del arma
   */
  base_damage: number;

  /**
   * Habilidad principal que usa el arma para realizar sus ataques
   */
  ability: Ability;

  /**
   * Tipo de rango del ataque del arma
   */
  attack_range: Attack_Range;

  /**
   * Si el @attack_range es igual a Attack_Range.REACH entonces este valor debe ser llenado, de otra forma es irrelevante
   * @remarks Sus valores deben ser multiplos de 5
   */
  reach_range?: number;

  /**
   * Modo de agarre del arma
   */
  grip_mode: Grip_Mode;

  /**
   * Wild efect
   */
  wield_effect?: Wield_Effect;

  /**
   * Solo pedir cuando se quiera dar de alta una firearm, o algun arma a distancia con mucion como ballestas
   */
  ammo_capacity?: number;

  /**
   * Solo pedir cuando se quiera dar de alta una firearm, o algun arma a distancia con mucion como ballestas
   */
  reloadrate?: number;

  /**
   * Nombre del arma
   */
  attacks: Attack[];

  /**
   * Validar que la url se pueda obtener y que sea una imagen,
   * tamañó recomendado h=176 w=208 aunque posiblemente esto cambie mas a futuro.
   */
  image?: string;

  /**
   * Ignorar de momento....
   */
  shapes?: string[];

  constructor(data: Partial<Weapon> = {}) {
    this.name = data.name ?? '';
    this.durability = data.durability ?? 0; //respetar las reglas del valor por defecto si el valor inicial es null
    this.weapon_type = data.weapon_type;
    this.durability_type = data.durability_type ?? Durability_Type.Regular;
    this.is_throwable = data.is_throwable ?? false;
    this.is_block = data.is_block ?? false;
    this.is_agile = data.is_agile ?? false;
    this.short_description = data.short_description;
    this.description = data.description;
    this.notes = data.notes;
    this.base_damage = data.base_damage ?? 1;
    this.ability = data.ability ?? Ability.MIGHT;
    this.attack_range = data.attack_range ?? Attack_Range.MELEE;
    this.reach_range = data.reach_range;
    this.grip_mode = data.grip_mode ?? Grip_Mode.ONE_HAND;
    this.wield_effect = data.wield_effect ?? Wield_Effect.VERSATILE;
    this.image = data.image;
    this.id = data.id ?? ''; //respetar las reglas del valor por defecto si el valor inicial es null
    this.ammo_capacity = data.ammo_capacity;
    this.reloadrate = data.reloadrate;

    this.attacks = (data.attacks ?? []).map((a) => {
      const attack = new Attack(a, this);
      return attack;
    });
  }

  get has_notes(): boolean {
    return !!this.notes?.trim();
  }

  get dynamic_notes(): string[] {
    const text: string[] = [];
    if (this.has_notes) {
      text.push(this.notes ?? '');
    }
    if (this.grip_mode == '2h' || this.grip_mode == '2hr') {
      text.push('weapon.enum.notes.grip.' + this.grip_mode);
    }
    if (this.range_type != 'melee') {
      text.push('weapon.enum.notes.range.' + this.range_type);
    }
    if (!this.ammo_capacity) {
      text.push('weapon.enum.notes.wield.' + this.wield_effect);
    }
    if (this.is_Guard) {
      text.push('weapon.enum.notes.guard.' + this.guard_type);
    }
    return text;
  }

  get ammo_or_wield_effect(): string {
    return this.ammo_capacity ? 'ammo-capacity' : 'wield-' + this.wield_effect;
  }

  get range_type(): string {
    const match = Weapon.REACH_REGEX.test(this.attack_range);
    return match ? 'reach' : this.attack_range;
  }

  get has_range_value(): boolean {
    return this.attack_range != 'melee';
  }

  get range_value(): string {
    let value = '';
    switch (this.range_type) {
      case 'reach': {
        const match = this.attack_range.match(Weapon.REACH_REGEX);
        value = match?.[1] ?? '';
        break;
      }
      case 'short':
        value = 'S';
        break;
      case 'medium':
        value = 'M';
        break;
      case 'large':
        value = 'L';
        break;
    }
    return value;
  }

  get is_Guard(): boolean {
    return this.is_agile || this.is_block;
  }

  get guard_type(): string {
    if (this.is_agile && this.is_block) {
      return 'guard';
    }
    if (this.is_agile) {
      return 'agile';
    }
    return 'block';
  }

  get is_long_description(): boolean {
    return (this.short_description?.length ?? 0) > 144;
  }

  toJSON() {
    const publicProps = Object.fromEntries(
      Object.entries(this).filter(
        ([key]) => !key.startsWith('#') && !key.startsWith('_'),
      ),
    );
    return {
      ...publicProps,
      attacks: this.attacks.map((attack) => attack.toJSON()),
    };
  }
}
