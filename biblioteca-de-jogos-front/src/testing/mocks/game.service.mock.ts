import { Game } from '@/core/game/game.model';
import { GameService } from '@/core/game/game.service';
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { Observable, of } from 'rxjs';
import { vi } from 'vitest';

class MockGameService implements GameService {
  getGames = vi.fn();
  createGame = vi.fn();
  updateGame = vi.fn();
  deleteGame = vi.fn();
  getGameById = vi.fn(() =>
    of({
      id: 1,
      name: 'Game 1',
      developer: 'Developer 1',
      releaseYear: 2020,
      genres: ['Action', 'Adventure'],
      cover: 'cover1.jpg',
      description: 'Description 1',
      synopsis: 'Synopsis 1',
    } as Game),
  );
}

export function provideGameServiceMock(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: GameService,
      useValue: new MockGameService(),
    },
  ]);
}
