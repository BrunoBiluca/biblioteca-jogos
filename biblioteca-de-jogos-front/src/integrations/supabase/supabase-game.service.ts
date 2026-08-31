import { Game } from '@/core/game/game.model';
import { GameService } from '@/core/game/game.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class SupabaseGameService extends GameService {
  override getGames(params: {
    page: number;
    pageSize: number;
    name?: string;
    developer?: string;
    genres?: string[];
    releaseYear?: number;
  }): Observable<{ games: Game[]; total: number; availableGenres?: string[] }> {
    throw new Error('Method not implemented.');
  }

  override createGame(
    gameData: Omit<Game, 'id' | 'cover'>,
    coverFile: File,
  ): Observable<Game> {
    throw new Error('Method not implemented.');
  }

  override updateGame(
    id: number,
    gameData: Partial<Game>,
    coverFile?: File,
  ): Observable<Game> {
    throw new Error('Method not implemented.');
  }

  override deleteGame(id: number): Observable<void> {
    throw new Error('Method not implemented.');
  }
}
