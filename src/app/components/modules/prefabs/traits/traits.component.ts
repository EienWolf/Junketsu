import { Component, OnInit } from '@angular/core';
import {
  Ability,
  AbilityType,
  TraitsService,
} from '../../../../services/traits.service';
import { DialogService } from 'primeng/dynamicdialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-traits',
  templateUrl: './traits.component.html',
  styleUrl: './traits.component.scss',
  standalone: false,
})
export class TraitsComponent implements OnInit {
  abilities: Ability[] = [];
  selectedAbility: Ability | null = null;
  filteredAbilities: Ability[] = [];
  searchTerm: string = '';
  selectedType: string = 'all';

  abilityTypes = [
    { label: 'Todos los tipos', value: 'all' },
    { label: 'Combate', value: 'Combat' },
    { label: 'Defensa', value: 'Defense' },
    { label: 'Pasiva', value: 'Passive' },
    { label: 'Conocimiento', value: 'Knowledge' },
    { label: 'Exploración', value: 'Exploration' },
    { label: 'Sigilo', value: 'Stealth' },
    { label: 'Apoyo', value: 'Support' },
    { label: 'Supervivencia', value: 'Survival' },
    { label: 'Fabricación', value: 'Crafting' },
    { label: 'Mental', value: 'Mental' },
    { label: 'Movimiento', value: 'Movement' },
    { label: 'Rastreo', value: 'Tracking' },
    { label: 'Curación', value: 'Healing' },
    { label: 'Social', value: 'Social' },
    { label: 'Ritual', value: 'Ritual' },
  ];

  displayDialog: boolean = false;

  constructor(
    private readonly traitsService: TraitsService,
    private dialogService: DialogService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.abilities = this.traitsService.getAllAbilities();
    this.filteredAbilities = this.abilities;
  }

  openAbilityDialog(ability: Ability): void {
    this.selectedAbility = ability;
    this.displayDialog = true;
  }

  closeDialog(): void {
    this.displayDialog = false;
  }

  getClassForAbilityType(type: string): string {
    switch (type) {
      case 'Combat':
        return 'bg-red-900';
      case 'Defense':
        return 'bg-blue-900';
      case 'Passive':
        return 'bg-green-900';
      case 'Knowledge':
        return 'bg-purple-900';
      case 'Exploration':
        return 'bg-indigo-900';
      case 'Stealth':
        return 'bg-gray-900';
      case 'Support':
        return 'bg-teal-900';
      case 'Survival':
        return 'bg-orange-900';
      case 'Crafting':
        return 'bg-yellow-900';
      case 'Mental':
        return 'bg-purple-900';
      case 'Movement':
        return 'bg-blue-900';
      case 'Tracking':
        return 'bg-green-900';
      case 'Healing':
        return 'bg-teal-900';
      case 'Social':
        return 'bg-indigo-900';
      case 'Ritual':
        return 'bg-purple-900';
      default:
        return 'bg-gray-800';
    }
  }

  getAbilityTypeLabel(type: string): string {
    switch (type) {
      case 'Combat':
        return 'Combate';
      case 'Defense':
        return 'Defensa';
      case 'Passive':
        return 'Pasiva';
      case 'Knowledge':
        return 'Conocimiento';
      case 'Exploration':
        return 'Exploración';
      case 'Stealth':
        return 'Sigilo';
      case 'Support':
        return 'Apoyo';
      case 'Survival':
        return 'Supervivencia';
      case 'Crafting':
        return 'Fabricación';
      case 'Mental':
        return 'Mental';
      case 'Movement':
        return 'Movimiento';
      case 'Tracking':
        return 'Rastreo';
      case 'Healing':
        return 'Curación';
      case 'Social':
        return 'Social';
      case 'Ritual':
        return 'Ritual';
      default:
        return type;
    }
  }

  filterAbilities(): void {
    this.filteredAbilities = this.abilities.filter((ability) => {
      // Filtrar por tipo
      const matchesType =
        this.selectedType === 'all' || ability.type === this.selectedType;

      // Filtrar por término de búsqueda
      const matchesSearch =
        this.searchTerm === '' ||
        ability.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        ability.description
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        ability.effect.toLowerCase().includes(this.searchTerm.toLowerCase());

      return matchesType && matchesSearch;
    });
  }

  onSearchChange(): void {
    this.filterAbilities();
  }

  onTypeChange(): void {
    this.filterAbilities();
  }

  getPrerequisiteDescription(prerequisite: string): string {
    // Puedes implementar lógica para formatear o traducir los requisitos
    return prerequisite;
  }

  getAbilityIcon(type: string): string {
    switch (type.toLowerCase()) {
      case 'combat':
        return 'pi pi-bolt';
      case 'defense':
        return 'pi pi-shield';
      case 'passive':
        return 'pi pi-circle';
      case 'knowledge':
        return 'pi pi-book';
      case 'exploration':
        return 'pi pi-map';
      case 'stealth':
        return 'pi pi-eye-slash';
      case 'support':
        return 'pi pi-users';
      case 'survival':
        return 'pi pi-sun';
      case 'crafting':
        return 'pi pi-cog';
      case 'mental':
        return 'pi pi-brain';
      case 'movement':
        return 'pi pi-arrows-h';
      case 'tracking':
        return 'pi pi-search';
      case 'healing':
        return 'pi pi-plus';
      case 'social':
        return 'pi pi-comments';
      case 'ritual':
        return 'pi pi-star';
      default:
        return 'pi pi-question';
    }
  }
}
