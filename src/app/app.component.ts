import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeaponComponent } from './components/weapon/weapon.component';
import { WeaponFormComponent } from './components/weapon-form/weapon-form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WeaponComponent, WeaponFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'junketsu';
}
