import { TestBed } from '@angular/core/testing';

import { StandaloneGameService } from './standalone-game.service';

describe('StandaloneGameService', () => {
  let service: StandaloneGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StandaloneGameService],
    });
    service = TestBed.inject(StandaloneGameService);
  });

  it('should load all games', () => {
    service.getGames({ page: 1, pageSize: 10 }).subscribe((games) => {
      expect(games.games.length).toBe(2);
    });
  });

  it('should create a game', () => {
    const gameData = {
      name: 'Test Game',
      developer: 'Test Developer',
      releaseYear: 2023,
      genres: ['action', 'adventure'],
    };
    const coverFile = new File([], 'cover.jpg');
    service
      .createGame(gameData, coverFile)
      .subscribe((createdGame) => expect(createdGame.name).toBe('Test Game'));
  });

  it('should update a game', () => {
    const gameData = {
      name: 'Updated Game',
    };
    service
      .updateGame(1, gameData)
      .subscribe((updatedGame) =>
        expect(updatedGame.name).toBe('Updated Game'),
      );
  });

  it('should delete a game', () => {
    const values: number[] = [];

    service.getGames({ page: 1, pageSize: 10 }).subscribe({
      next: (games) => {
        values.push(games.total);
      },
      complete: () => {
        expect(values[0]).toBe(2);
        expect(values[1]).toBe(1);
      },
    });

    service.deleteGame(1).subscribe();
  });
});
