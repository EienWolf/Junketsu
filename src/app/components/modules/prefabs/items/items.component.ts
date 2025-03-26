import { Component } from '@angular/core';
import { Consumable } from '../../../../models/item.model';
import { ItemsService } from '../../../../services/items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrl: './items.component.css',
  standalone: false,
})
export class ItemsComponent {
  consumables: Consumable[] = [];
  filteredConsumables: Consumable[] = [];
  selectedConsumable: Consumable | null = null;

  displayDialog: boolean = false;
  searchTerm: string = '';

  categoryOptions = [
    { label: 'Todos', value: '' },
    { label: 'Consumible', value: 'Consumible' },
    { label: 'Explosivo', value: 'Explosivo' },
    { label: 'Arrojadizo', value: 'Arrojadizo' },
    { label: 'Munición', value: 'Munición' },
  ];

  rarityOptions = [
    { label: 'Todos', value: '' },
    { label: 'Común', value: 'Común' },
    { label: 'Poco común', value: 'Poco común' },
    { label: 'Raro', value: 'Raro' },
    { label: 'Muy raro', value: 'Muy raro' },
    { label: 'Legendario', value: 'Legendario' },
  ];

  selectedCategory: string = '';
  selectedRarity: string = '';

  constructor(private consumableService: ItemsService) {}

  ngOnInit(): void {
    this.loadConsumables();
  }

  loadConsumables(): void {
    this.consumables = this.consumableService.getAllConsumables();
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredConsumables = this.consumables.filter((item) => {
      const matchesSearch =
        this.searchTerm === '' ||
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesCategory =
        this.selectedCategory === '' || item.category === this.selectedCategory;

      const matchesRarity =
        this.selectedRarity === '' || item.rarity === this.selectedRarity;

      return matchesSearch && matchesCategory && matchesRarity;
    });
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.selectedRarity = '';
    this.applyFilters();
  }

  showDetails(consumable: Consumable): void {
    this.selectedConsumable = consumable;
    this.displayDialog = true;
  }

  getCategoryIcon(category: string): string {
    switch (category) {
      case 'Consumible':
        return 'ra-potion';
      case 'Explosivo':
        return 'ra-bomb-explosion';
      case 'Arrojadizo':
        return 'ra-thrown-knife';
      case 'Munición':
        return 'ra-bullets';
      default:
        return 'ra-potion';
    }
  }

  getRarityClass(rarity: string): string {
    switch (rarity) {
      case 'Común':
        return 'bg-gray-600';
      case 'Poco común':
        return 'bg-green-700';
      case 'Raro':
        return 'bg-blue-600';
      case 'Muy raro':
        return 'bg-purple-700';
      case 'Legendario':
        return 'bg-orange-600';
      default:
        return 'bg-gray-600';
    }
  }

  getDurationIcon(duration: string): string {
    if (duration.includes('Instantáneo')) {
      return 'ra-lightning-bolt';
    } else if (duration.includes('turno')) {
      return 'ra-hourglass';
    } else {
      return 'ra-stopwatch';
    }
  }
}
