import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from './game.model';

@Injectable()
export abstract class GameService {
  abstract getGames(params: {
    page: number;
    pageSize: number;
    name?: string;
    developer?: string;
    genres?: string[];
    releaseYear?: number;
  }): Observable<{
    games: Game[];
    total: number;
    allGenres?: string[];
    allDevelopers?: string[];
  }>;

  abstract createGame(
    gameData: Omit<Game, 'id' | 'cover'>,
    coverFile: File,
  ): Observable<Game>;

  abstract updateGame(
    id: number,
    gameData: Partial<Game>,
    coverFile?: File,
  ): Observable<Game>;

  abstract deleteGame(id: number): Observable<void>;
}
