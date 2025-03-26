import { Component } from '@angular/core';
import { Weapon } from '../../../../models/weapon.model';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrl: './weapons.component.css',
  standalone: false,
})
export class WeaponsComponent {
  weapons: Weapon[] = [];
  selectedWeapon: Weapon | null = null;
  filteredWeapons: Weapon[] = [];
  searchTerm: string = '';
  selectedType: string = 'all';

  weaponTypes = [
    { label: 'Todos los tipos', value: 'all' },
    { label: 'Armas transformables', value: 'trick_weapon' },
    { label: 'Espada', value: 'sword' },
    { label: 'Special', value: 'special' },
    { label: 'Armas de fuego', value: 'firearm' },
  ];

  constructor() {}

  ngOnInit(): void {
    this.loadWeapons();
  }

  loadWeapons(): void {
    try {
      const weaponsData = localStorage.getItem('weapons');
      if (weaponsData) {
        this.weapons = JSON.parse(weaponsData);
        this.weapons = this.weapons.filter((item: Weapon) => {
          return item.is_alternate_form != true;
        });

        this.filteredWeapons = [...this.weapons];
        // Si hay armas, selecciona la primera por defecto
        if (this.weapons.length > 0) {
          this.selectedWeapon = this.weapons[0];
        }
      } else {
        console.log('No se encontraron armas en localStorage');
      }
    } catch (error) {
      console.error('Error al cargar las armas:', error);
    }
  }

  selectWeapon(weapon: Weapon): void {
    this.selectedWeapon = weapon;
  }

  getClassForWeaponType(type: string): string {
    switch (type) {
      case 'trick_weapon':
        return 'bg-red-900';
      case 'firearm':
        return 'bg-blue-900';
      case 'sword':
        return 'bg-gray-900';
      case 'special':
        return 'bg-orange-900';
      default:
        return 'bg-gray-800';
    }
  }

  getWeaponTypeLabel(type: string): string {
    switch (type) {
      case 'trick_weapon':
        return 'Arma transformable';
      case 'firearm':
        return 'Arma de fuego';
      case 'sword':
        return 'Hoja';
      case 'special':
        return 'Special';
      default:
        return type;
    }
  }

  filterWeapons(): void {
    this.filteredWeapons = this.weapons.filter((weapon) => {
      // Filtrar por tipo
      const matchesType =
        this.selectedType === 'all' || weapon.weapon_type === this.selectedType;

      // Filtrar por término de búsqueda
      const matchesSearch =
        this.searchTerm === '' ||
        weapon.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        weapon
          .description!.toLowerCase()
          .includes(this.searchTerm.toLowerCase());

      return matchesType && matchesSearch;
    });
  }

  onSearchChange(): void {
    this.filterWeapons();
  }

  onTypeChange(): void {
    this.filterWeapons();
  }

  getAbilityIcon(ability: string): string {
    switch (ability.toLowerCase()) {
      case 'fuerza':
        return 'pi pi-bolt';
      case 'destreza':
        return 'pi pi-arrows-h';
      case 'precision':
        return 'pi pi-eye';
      case 'arcane':
        return 'pi pi-star';
      default:
        return 'pi pi-question';
    }
  }

  getRangeIcon(range: string): string {
    switch (range.toLowerCase()) {
      case 'corto':
      case 'short':
        return 'pi pi-minus';
      case 'medium':
      case 'mediano':
        return 'pi pi-arrows-h';
      case 'large':
      case 'largo':
        return 'pi pi-arrows-h-fill';
      default:
        return 'pi pi-question';
    }
  }
}
