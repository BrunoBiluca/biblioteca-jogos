import { TestBed } from '@angular/core/testing';

import { StandaloneGameService } from './standalone-game.service';
import { Game } from '@/core/game/game.service';

describe('StandaloneGameService', () => {
  let service: StandaloneGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandaloneGameService);
  });

  it('should submit a new game', async () => {
    await service.create({
      name: 'name',
      cover: 'cover',
      developer: 'developer',
      releaseYear: 2024,
      genres: ['action', 'adventure'],
    });
  });
});
