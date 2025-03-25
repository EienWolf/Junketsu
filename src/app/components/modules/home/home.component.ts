// Agregar al home.component.ts

import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';

export interface SubMenuItem {
  label: string;
  icon: string;
  url: string;
  active?: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit, AfterViewInit {
  // Referencia al contenedor del submenú para controlar el scroll
  @ViewChild('subMenuContainer') subMenuContainer!: ElementRef;

  // Propiedades para controlar la navegación del submenú
  subMenuItems: SubMenuItem[] = [];
  selectedSubMenu: SubMenuItem | null = null;
  showLeftScrollButton = false;
  showRightScrollButton = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initializeSubMenu();
  }

  ngAfterViewInit(): void {
    // Comprueba inicialmente si los botones de desplazamiento son necesarios
    setTimeout(() => {
      this.checkScrollButtons();
    }, 100);
  }

  // Escucha los cambios de tamaño de ventana para actualizar los botones de scroll
  @HostListener('window:resize')
  onResize(): void {
    this.checkScrollButtons();
  }

  initializeSubMenu(): void {
    this.subMenuItems = [
      {
        label: 'Manuales',
        icon: 'pi pi-book',
        url: '/manuals',
        active: true,
      },
      {
        label: 'Clases',
        icon: 'pi pi-id-card',
        url: '/classes',
      },
      {
        label: 'Linajes',
        icon: 'pi pi-sitemap',
        url: '/lineages',
      },
      {
        label: 'Armas',
        icon: 'pi pi-bolt',
        url: '/weapons',
      },
      {
        label: 'Objetos',
        icon: 'pi pi-box',
        url: '/items',
      },
      {
        label: 'Hechizos',
        icon: 'pi pi-magic',
        url: '/spells',
      },
      {
        label: 'Bestiario',
        icon: 'pi pi-ghost',
        url: '/bestiary',
      },
      {
        label: 'Herramientas',
        icon: 'pi pi-cog',
        url: '/tools',
      },
      {
        label: 'Foros',
        icon: 'pi pi-comments',
        url: '/forums',
      },
      {
        label: 'Campañas',
        icon: 'pi pi-book-reader',
        url: '/campaigns',
      },
      {
        label: 'Tutoriales',
        icon: 'pi pi-question-circle',
        url: '/tutorials',
      },
    ];
  }

  // Comprueba si los botones de desplazamiento deben mostrarse
  checkScrollButtons(): void {
    if (!this.subMenuContainer) return;

    const container = this.subMenuContainer.nativeElement;

    // Si el contenido es más ancho que el contenedor, muestra el botón derecho
    this.showRightScrollButton =
      container.scrollWidth > container.clientWidth &&
      container.scrollLeft < container.scrollWidth - container.clientWidth;

    // Si ya hemos desplazado hacia la derecha, muestra el botón izquierdo
    this.showLeftScrollButton = container.scrollLeft > 0;
  }

  // Función para desplazar el menú hacia la izquierda o derecha
  scrollSubMenu(direction: 'left' | 'right'): void {
    if (!this.subMenuContainer) return;

    const container = this.subMenuContainer.nativeElement;
    const scrollAmount = container.clientWidth * 0.75; // Desplaza un 75% del ancho visible

    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }

    // Actualiza los botones después de completar el desplazamiento
    setTimeout(() => {
      this.checkScrollButtons();
    }, 300);
  }

  // Maneja la navegación cuando se selecciona una opción del dropdown en móvil
  navigateToSubMenu(item: SubMenuItem): void {
    if (!item) return;

    this.selectedSubMenu = item;

    // Navega a la URL o maneja la acción según sea necesario
    // Puedes usar router.navigate o window.location según tu configuración

    // Con Angular Router (descomenta si usas rutas de Angular)
    // this.router.navigate([item.url]);

    // O redirección básica
    window.location.href = item.url;
  }

  // Escucha eventos de desplazamiento en el contenedor para actualizar los botones
  onSubMenuScroll(): void {
    this.checkScrollButtons();
  }
}
