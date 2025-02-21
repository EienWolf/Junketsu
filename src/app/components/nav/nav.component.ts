import { Component } from '@angular/core';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'nav-bar',
  imports: [SharedModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})

export class NavComponent { 
  default_theme: string = '';

  toggle_theme(): void {
    if (this.default_theme == '') {
      this.default_theme = 'dark';
    }else{
      this.default_theme = '';
    }
    this.change_theme(this.default_theme);
  }

  change_theme(theme: string) {
    // Obtener tema actual
    let current_theme = localStorage.getItem('theme');
    
    // Si no hay tema guardado, usar preferencia del sistema
    if (!current_theme) {
        current_theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "";
        localStorage.setItem('theme', current_theme);
    }

    // Aplicar tema actual si es necesario
    const currentDataTheme = document.documentElement.getAttribute('data-theme');
    if (current_theme !== currentDataTheme) {
        document.documentElement.setAttribute('data-theme', current_theme);
    }

    // Cambiar al nuevo tema si es diferente
    if (current_theme !== theme) {
        console.log(`Cambiando de ${current_theme} a ${theme}`);
        localStorage.setItem('theme', theme);
        
        // Actualizar atributo data-theme
        if (theme === '') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', theme);
        }
    }
  }
}



