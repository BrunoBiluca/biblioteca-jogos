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
    genres?: string[];
    releaseYear?: number;
  }): Observable<{ games: Game[]; total: number; availableGenres?: string[] }> {
    return new Observable((observer) => {
      observer.next({
        games: this.games,
        total: this.games.length,
        availableGenres: this.games.map((game) => game.genres[0]).flat(),
      });
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
