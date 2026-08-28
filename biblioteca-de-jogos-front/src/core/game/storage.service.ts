// core/services/storage.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly API_URL = 'api/storage';

  constructor(private http: HttpClient) {}

  uploadCover(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('cover', file);

    return this.http.post<{ url: string }>(`${this.API_URL}/upload`, formData).pipe(map((response) => response.url));
  }

  deleteCover(coverUrl: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/delete`, {
      params: { url: coverUrl },
    });
  }
}
