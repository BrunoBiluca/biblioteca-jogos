import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { map, Observable, switchMap } from 'rxjs';
import { Game } from './game.model';

@Injectable()
export abstract class GameService {
  abstract getGames(params: {
    page: number;
    pageSize: number;
    name?: string;
    developer?: string;
    genres?: string;
    releaseYear?: number;
  }): Observable<{ games: Game[]; total: number; availableGenres?: string[] }>;

  abstract getAvailableGenres(): Observable<string[]>;

  abstract createGame(
    gameData: Omit<Game, 'id'>,
    coverFile: File,
  ): Observable<Game>;

  abstract updateGame(
    id: number,
    gameData: Partial<Game>,
    coverFile?: File,
  ): Observable<Game>;

  abstract deleteGame(id: number): Observable<void>;
}
