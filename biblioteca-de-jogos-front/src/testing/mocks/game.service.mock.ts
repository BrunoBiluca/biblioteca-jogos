import { Game } from '@/core/game/game.model';
import { GameService } from '@/core/game/game.service';
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';

export class MockGameService implements GameService {
  mockGames: Game[] = [
    {
      id: 1,
      name: 'Game 1',
      developer: 'Dev 1',
      genres: ['Action'],
      releaseDate: new Date('2020-12-17'),
      cover: 'cover',
      coverFile: new File([''], 'cover.jpg'),
    },
    {
      id: 2,
      name: 'Game 2',
      developer: 'Dev 2',
      genres: ['Adventure'],
      releaseDate: new Date('2021-12-17'),
      cover: 'cover',
      coverFile: new File([''], 'cover.jpg'),
    },
  ];

  mockGenres = new Set([...this.mockGames.map((game) => game.genres)]);

  getGames = vi.fn(
    (params: {
      page: number;
      pageSize: number;
      name?: string;
      developer?: string;
      genres?: string[];
      releaseYear?: Date;
    }) =>
      of({
        games: this.mockGames,
        total: this.mockGames.length,
        availableGenres: this.mockGenres,
      }),
  );

  createGame = vi.fn(
    (gameData: Omit<Game, 'id' | 'cover' | 'coverFile'>, coverFile: File) =>
      of({
        id: 1,
        name: 'Game 1',
        developer: 'Developer 1',
        releaseDate: new Date('2020-12-17'),
        genres: ['Action', 'Adventure'],
        cover: 'cover1.jpg',
        description: 'Description 1',
        synopsis: 'Synopsis 1',
      } as Game),
  );

  updateGame = vi.fn();

  deleteGame = vi.fn((id: number) => {
    this.mockGames = this.mockGames.filter((game) => game.id !== 1);
    return of();
  });

  getGameById = vi.fn((gameId: number) =>
    of({
      id: 1,
      name: 'Game 1',
      developer: 'Developer 1',
      releaseDate: new Date('2020-12-17'),
      genres: ['Action', 'Adventure'],
      cover: 'cover1.jpg',
      description: 'Description 1',
      synopsis: 'Synopsis 1',
    } as Game),
  );

  toCustom = (pagedGames: Game[]) => {
    this.getGames.mockReturnValue(
      of({
        games: pagedGames,
        total: this.mockGames.length,
        availableGenres: this.mockGenres,
      }),
    );
    return this;
  };

  toDefault = () => {
    this.getGames.mockReturnValue(
      of({
        games: this.mockGames,
        total: this.mockGames.length,
        availableGenres: this.mockGenres,
      }),
    );
    return this;
  };

  withPagination = () => {
    this.getGames.mockImplementation(
      (params: {
        page: number;
        pageSize: number;
        name?: string;
        developer?: string;
        genres?: string[];
        releaseYear?: Date;
      }) => {
        return of({
          games: [this.mockGames[params.page - 1]],
          total: this.mockGames.length,
          availableGenres: this.mockGenres,
        });
      },
    );
  };

  withError = () => {
    const error = new Error('Failed to load games');
    this.getGames.mockImplementation(() => throwError(() => error));
    return this;
  };
}

export function provideGameServiceMock(
  gameService?: MockGameService,
): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: GameService,
      useValue: gameService ?? new MockGameService(),
    },
    {
      provide: MockGameService,
      useValue: gameService ?? new MockGameService(),
    },
  ]);
}
