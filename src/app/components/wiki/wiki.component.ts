import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';

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
  styleUrls: ['./wiki.component.css'],
  imports: [MarkdownComponent],
})
export class WikiComponent implements OnInit {
  route_string: String = '';
  constructor(private readonly route: ActivatedRoute) {}

  item: SlugInterface = new SlugInterface({
    id: 'caminar',
    route: 'es/actions/movement/',
  });

  slugs: Array<SlugInterface> = [this.item];

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      let slug = param['route'];

      this.route_string =
        this.slugs.find((item) => item.id == slug)?.fullRoute ?? '404';
    });
  }
}
