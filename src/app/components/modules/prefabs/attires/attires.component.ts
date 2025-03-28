import { Component } from '@angular/core';
import { AttireService } from '../../../../services/attire.service';
interface Resistance {
  type: string;
  value: number;
}

interface Armor {
  id: string;
  name: string;
  image: string;
  description: string;
  mitigation: number;
  resistances: {
    physical: number;
    bleed: number;
    fire: number;
    arcane: number;
    poison: number;
    frenzy: number;
  };
  stamina_regeneration: number;
  additional_slots: number;
  set_bonus: string;
  weight_class: string;
  origin: string;
}
@Component({
  selector: 'app-attires',
  templateUrl: './attires.component.html',
  styleUrl: './attires.component.css',
  standalone: false,
})
export class AttiresComponent {
  armors: Armor[] = [];
  filteredArmors: Armor[] = [];

  // Filter variables
  searchTerm: string = '';
  selectedWeightClass: string = '';

  // Dropdown options
  weightClasses = [
    { label: 'All Weights', value: '' },
    { label: 'Light', value: 'light' },
    { label: 'Medium', value: 'medium' },
    { label: 'Heavy', value: 'heavy' },
  ];

  // Detail dialog
  displayArmorDetail: boolean = false;
  selectedArmor: Armor | null = null;

  constructor(private service: AttireService) {}

  ngOnInit(): void {
    this.loadArmors();
  }

  loadArmors(): void {
    this.service.loadPrefabData().subscribe({
      next: (response: any) => {
        console.log(response);
        this.armors = response;
        this.filterArmors();
      },
    });
  }

  filterArmors(): void {
    this.filteredArmors = this.armors.filter((armor) => {
      // Filter by search term
      const matchesSearch =
        this.searchTerm === '' ||
        armor.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        armor.description.toLowerCase().includes(this.searchTerm.toLowerCase());

      // Filter by weight class
      const matchesWeightClass =
        this.selectedWeightClass === '' ||
        armor.weight_class === this.selectedWeightClass;

      return matchesSearch && matchesWeightClass;
    });
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedWeightClass = '';
    this.filteredArmors = [...this.armors];
  }

  getResistances(armor: Armor): Resistance[] {
    // Return only the top 6 resistances for the card view
    return Object.entries(armor.resistances)
      .map(([type, value]) => ({ type, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }

  getFullResistances(armor: Armor): Resistance[] {
    // Return all resistances for the detail view
    return Object.entries(armor.resistances).map(([type, value]) => ({
      type,
      value,
    }));
  }

  getResistanceIcon(type: string): string {
    switch (type.toLowerCase()) {
      case 'physical':
        return 'pi-shield';
      case 'bleed':
        return 'pi-heart';
      case 'fire':
        return 'pi-fire';
      case 'arcane':
        return 'pi-star';
      case 'poison':
        return 'pi-vial';
      case 'frenzy':
        return 'pi-eye';
      default:
        return 'pi-question';
    }
  }

  getStaminaText(value: number): string {
    switch (value) {
      case -1:
        return 'Reduced';
      case 0:
        return 'Normal';
      case 1:
        return 'Enhanced';
      default:
        return 'Unknown';
    }
  }

  showArmorDetails(armor: Armor): void {
    this.selectedArmor = armor;
    this.displayArmorDetail = true;
  }
}
