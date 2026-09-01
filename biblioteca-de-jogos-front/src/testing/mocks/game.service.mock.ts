import { GameService } from '@/core/game/game.service';
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { vi } from 'vitest';

class MockGameService {
  getGames = vi.fn();
  createGame = vi.fn();
  updateGame = vi.fn();
  deleteGame = vi.fn();
}

export function provideGameServiceMock(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: GameService,
      useValue: new MockGameService(),
    },
  ]);
}
