import { Component } from '@angular/core';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'nav-bar',
  imports: [SharedModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})

export class NavComponent { }
