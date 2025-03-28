import { Component, OnInit } from '@angular/core';
import { SlugInterface } from '../wiki/wiki.component';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SharedModule } from '../../shared.module';

interface DirectoryItem {
  id: string;
  valor?: any; // Cambia 'any' por el tipo específico si es necesario
}

@Component({
  selector: 'app-directory',
  templateUrl: './wikiDirectory.component.html',
  styleUrls: ['./wikiDirectory.component.scss'],
  imports: [SharedModule],
})
export class WikiDirectoryComponent implements OnInit {
  alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  groupedItems: { [key: string]: SlugInterface[] } = {};
  constructor(private readonly http: HttpClient) {}

  // Ejemplo de datos - reemplaza con tu JSON real
  items: SlugInterface[] = [];

  ngOnInit(): void {
    this.loadManifest().subscribe({
      next: (slugs) => {
        this.items = slugs ?? [];
        this.groupItems();
      },
    });
  }

  private loadManifest() {
    return this.http
      .get<SlugInterface[]>('assets/wiki/manifest.json')
      .pipe(catchError(() => of([])));
  }

  private groupItems() {
    const groups: { [key: string]: SlugInterface[] } = {};

    // Ordenar items alfabéticamente
    const sortedItems = this.items.sort((a, b) => a.id.localeCompare(b.id));

    sortedItems.forEach((item) => {
      // Obtener primera letra (manejar números y símbolos)
      const firstChar = item.id.charAt(0).toUpperCase();
      const key = /[A-Z]/.test(firstChar) ? firstChar : '#';

      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
    });

    // Ordenar las claves alfabéticamente
    const sortedKeys = Object.keys(groups).sort((a, b) => {
      if (a === '#') return 1;
      if (b === '#') return -1;
      return a.localeCompare(b);
    });

    // Reconstruir objeto ordenado
    this.groupedItems = sortedKeys.reduce(
      (acc, key) => {
        acc[key] = groups[key];
        return acc;
      },
      {} as { [key: string]: SlugInterface[] },
    );
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
