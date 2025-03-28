// consumable.model.ts
export interface Consumable {
  id: string;
  name: string;
  description: string;
  category: string;
  duration: string;
  slot_limit: number;
  effect: string;
  image: string;
  cost: number;
  rarity: string;
}

export enum ConsumableCategory {
  CONSUMIBLE = 'Consumible',
  EXPLOSIVO = 'Explosivo',
  ARROJADIZO = 'Arrojadizo',
  MUNICION = 'Munición',
}

export enum ConsumableRarity {
  COMUN = 'Común',
  POCO_COMUN = 'Poco común',
  RARO = 'Raro',
  MUY_RARO = 'Muy raro',
  LEGENDARIO = 'Legendario',
}
