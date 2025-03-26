import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AttireService {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly http: HttpClient,
  ) {}

  loadPrefabData() {
    const endpoint = 'assets/data/attires.json';
    return this.http.get(endpoint).pipe(catchError(() => of([])));
  }

  getAttire(index: string | number): Observable<any> {
    return this.loadPrefabData().pipe(
      map(
        (data: any) =>
          data.find((item: any) => item.id.toString() === index.toString()) ||
          {},
      ),
    );
  }
}
