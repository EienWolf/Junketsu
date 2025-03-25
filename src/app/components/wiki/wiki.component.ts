import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

class SlugInterface {
  id: string = '';
  route: string = '';

  constructor(data: Partial<SlugInterface> = {}) {
    this.id = data.id ?? '';
    this.route = data.route ?? '';
  }

  get fullRoute(): string {
    return this.route + this.id;
  }
}

@Component({
  selector: 'wiki-component',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.scss'],
  imports: [MarkdownComponent],
  encapsulation: ViewEncapsulation.None,
})
export class WikiComponent implements OnInit {
  markdownPath = '';
  notFound = false;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.loadManifest().subscribe({
      next: (slugs) => {
        this.route.paramMap.subscribe((params) => {
          const slug = params.get('slug') || '';
          const entry = slugs.find((s) => s.id === slug);
          if (entry) {
            this.markdownPath = `assets/wiki/${entry.route}${entry.id}.md`;
            this.notFound = false;
          } else {
            this.markdownPath = '';
            this.notFound = true;
          }
        });
      },
      error: () => (this.notFound = true),
    });
  }

  private loadManifest() {
    return this.http
      .get<SlugInterface[]>('assets/wiki/manifest.json')
      .pipe(catchError(() => of([])));
  }
}
