import { IndexedDB } from '@/common/indexeddb/indexeddb';
import { Game } from '@/core/game/game.model';
import { GameService } from '@/core/game/game.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class StandaloneGameService extends GameService {
  readonly indexedDB: IndexedDB;

  constructor() {
    super();

    this.indexedDB = new IndexedDB();
  }

  getAllGameKeys() {
    const allGames = [];

    for (const key in localStorage) {
      if (key.startsWith('games.')) {
        allGames.push(JSON.parse(localStorage.getItem(key) as string));
      }
    }

    return allGames as Game[];
  }

  override getGames(params: {
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
  }> {
    return new Observable((observer) => {
      const allGames = this.getAllGameKeys();
      const allGenres = allGames.flatMap((game) => game.genres);
      const uniqueGenres = Array.from(new Set(allGenres));
      const allDevelopers = allGames.map((game) => game.developer);
      const uniqueDevelopers = Array.from(new Set(allDevelopers));

      const filteredGames = allGames.filter((game) => {
        return (
          (!params.name || game.name.toLowerCase().includes(params.name)) &&
          (!params.developer ||
            game.developer.toLowerCase().includes(params.developer)) &&
          (!params.genres ||
            game.genres.some((genre) => params.genres?.includes(genre))) &&
          (!params.releaseYear || game.releaseYear === params.releaseYear)
        );
      });

      const gamePromises = filteredGames.map(async (game) => {
        const file = await this.indexedDB.getFile(game.cover);
        game.cover = URL.createObjectURL(file);
        return game;
      });

      Promise.all(gamePromises)
        .then((gamesWithFiles) => {
          const startIndex = (params.page - 1) * params.pageSize;
          const endIndex = startIndex + params.pageSize;
          const paginatedGames = gamesWithFiles.slice(startIndex, endIndex);

          observer.next({
            games: paginatedGames,
            total: allGames.length,
            allGenres: uniqueGenres,
            allDevelopers: uniqueDevelopers,
          });
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  override getGameById(gameId: number): Observable<Game> {
    return new Observable((observer) => {
      const storedGame = localStorage.getItem(`games.${gameId}`);
      if (storedGame) {
        const game = JSON.parse(storedGame) as Game;

        new Promise<Game>(async (resolve, reject) => {
          const file = await this.indexedDB.getFile(game.cover);
          game.cover = URL.createObjectURL(file);
          resolve(game);
        })
          .then((game) => {
            observer.next(game);
            observer.complete();
          })
          .catch((error) => {
            observer.error(new Error('Game not found'));
          });
      }
    });
  }

  override createGame(
    gameData: Omit<Game, 'id' | 'cover'>,
    coverFile: File,
  ): Observable<Game> {
    return new Observable((observer) => {
      const allGames = this.getAllGameKeys();
      const newGame = {
        ...gameData,
        id: allGames.length + 1,
        cover: '',
      };

      this.indexedDB
        .saveFile(coverFile)
        .then((coverId) => {
          newGame.cover = coverId;
          localStorage.setItem(`games.${newGame.id}`, JSON.stringify(newGame));
          return this.indexedDB.getFile(coverId);
        })
        .then((file) => {
          newGame.cover = URL.createObjectURL(file);
          observer.next(newGame);
        });
    });
  }

  override updateGame(
    id: number,
    gameData: Partial<Game>,
    coverFile?: File,
  ): Observable<Game> {
    return new Observable((observer) => {
      const game = JSON.parse(
        localStorage.getItem(`games.${id}`) as string,
      ) as Game;

      const updatedGame = {
        ...game,
        ...gameData,
      };

      localStorage.setItem(`games.${game.id}`, JSON.stringify(updatedGame));
      observer.next(game);
    });
  }

  override deleteGame(id: number): Observable<void> {
    return new Observable((observer) => {
      localStorage.removeItem(`games.${id}`);
      observer.next();
    });
  }
}
