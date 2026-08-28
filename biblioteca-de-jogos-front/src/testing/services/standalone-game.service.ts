import { Game } from '@/core/game/game.model';
import { GameService } from '@/core/game/game.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class StandaloneGameService extends GameService {
  private games: Game[] = [
    {
      id: 1,
      name: 'Solo Leveling: Arise Overdrive',
      cover: 'cover',
      developer: 'developer',
      releaseYear: 2024,
      genres: ['action', 'adventure'],
    },
    {
      id: 2,
      name: 'The Wither 3',
      cover: 'cover',
      developer: 'developer',
      releaseYear: 2025,
      genres: ['action', 'rpg'],
    },
  ];

  constructor() {
    super();
  }

  override getGames(params: {
    page: number;
    pageSize: number;
    name?: string;
    developer?: string;
    genres?: string;
    releaseYear?: number;
  }): Observable<{ games: Game[]; total: number; availableGenres?: string[] }> {
    return new Observable((observer) => {
      observer.next({
        games: this.games,
        total: this.games.length,
      });
    });
  }

  override getAvailableGenres(): Observable<string[]> {
    return new Observable((observer) => {
      observer.next(['action', 'adventure', 'rpg']);
    });
  }

  override createGame(
    gameData: Omit<Game, 'id' | 'cover'>,
    coverFile: File,
  ): Observable<Game> {
    return new Observable((observer) => {
      const newGame = {
        ...gameData,
        id: this.games.length + 1,
        cover: coverFile.name,
      };
      this.games.push(newGame);

      observer.next(newGame);
    });
  }
  override updateGame(
    id: number,
    gameData: Partial<Game>,
    coverFile?: File,
  ): Observable<Game> {
    return new Observable((observer) => {
      this.games = this.games.map((game) => {
        if (game.id === id) {
          return {
            ...game,
            ...gameData,
          };
        }
        return game;
      });
      observer.next(this.games.find((game) => game.id === id)!);
    });
  }
  override deleteGame(id: number): Observable<void> {
    return new Observable((observer) => {
      this.games = this.games.filter((game) => game.id !== id);
      observer.next();
    });
  }
}

// private readonly API_URL = 'api/games';
// getGames(params: {
//   page: number;
//   pageSize: number;
//   name?: string;
//   developer?: string;
//   genres?: string;
//   releaseYear?: number;
// }): Observable<{ games: Game[]; total: number; availableGenres?: string[] }> {
//   let httpParams = new HttpParams()
//     .set('page', params.page.toString())
//     .set('pageSize', params.pageSize.toString());

//   if (params.name) httpParams = httpParams.set('name', params.name);
//   if (params.developer)
//     httpParams = httpParams.set('developer', params.developer);
//   if (params.genres) httpParams = httpParams.set('genres', params.genres);
//   if (params.releaseYear)
//     httpParams = httpParams.set('releaseYear', params.releaseYear.toString());

//   return this.http.get<{
//     games: Game[];
//     total: number;
//     availableGenres?: string[];
//   }>(this.API_URL, {
//     params: httpParams,
//   });
// }

// getAvailableGenres(): Observable<string[]> {
//   return this.http.get<string[]>(`${this.API_URL}/genres`);
// }

// createGame(gameData: Omit<Game, 'id'>, coverFile: File): Observable<Game> {
//   return this.storageService.uploadCover(coverFile).pipe(
//     map((coverUrl) => ({
//       ...gameData,
//       cover: coverUrl,
//     })),
//     switchMap((gameWithCover) =>
//       this.http.post<Game>(this.API_URL, gameWithCover),
//     ),
//   );
// }

// updateGame(
//   id: number,
//   changes: Partial<Game>,
//   coverFile?: File,
// ): Observable<Game> {
//   if (coverFile) {
//     return this.storageService.uploadCover(coverFile).pipe(
//       map((coverUrl) => ({ ...changes, cover: coverUrl })),
//       switchMap((updatedData) =>
//         this.http.patch<Game>(`${this.API_URL}/${id}`, updatedData),
//       ),
//     );
//   }

//   return this.http.patch<Game>(`${this.API_URL}/${id}`, changes);
// }

// deleteGame(id: number): Observable<void> {
//   return this.http.delete<void>(`${this.API_URL}/${id}`);
// }
