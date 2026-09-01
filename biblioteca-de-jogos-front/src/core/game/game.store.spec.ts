import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { signal } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GameStore } from './game.store';
import { GameService } from './game.service';
import { GameFilters } from './game-filters.model';
import { Game } from './game.model';
import { of, throwError } from 'rxjs';

class MockGameService {
  getGames = vi.fn();
  createGame = vi.fn();
  updateGame = vi.fn();
  deleteGame = vi.fn();
}

describe('GameStore', () => {
  let store: InstanceType<typeof GameStore>;
  let gameService: MockGameService;

  const mockGames: Game[] = [
    {
      id: 1,
      name: 'Game 1',
      developer: 'Dev 1',
      genres: ['Action'],
      releaseYear: 2020,
      cover: 'cover',
    },
    {
      id: 2,
      name: 'Game 2',
      developer: 'Dev 2',
      genres: ['Adventure'],
      releaseYear: 2021,
      cover: 'cover',
    },
  ];

  const mockGenres = new Set([...mockGames.map((game) => game.genres)]);

  const mockDevelopers = new Set([...mockGames.map((game) => game.developer)]);

  const mockGamesServiceToDefault = () => {
    gameService.getGames.mockReturnValue(
      of({
        games: mockGames,
        total: mockGames.length,
        availableGenres: mockGenres,
      }),
    );
  };

  const customMockGamesService = (pagedGames: Game[]) => {
    gameService.getGames.mockReturnValue(
      of({
        games: pagedGames,
        total: mockGames.length,
        availableGenres: mockGenres,
      }),
    );
  };

  const mockGamesServiceWithError = () => {
    const error = new Error('Failed to load games');
    gameService.getGames.mockImplementation(() => throwError(() => error));
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();

    gameService = new MockGameService();

    TestBed.configureTestingModule({
      providers: [GameStore, { provide: GameService, useValue: gameService }],
    });

    store = TestBed.inject(GameStore);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Initial state', () => {
    it('should have initial state', () => {
      expect(store.loading()).toBe(false);
      expect(store.error()).toBe(null);
      expect(store.games()).toEqual([]);
      expect(store.allGenres()).toEqual([]);
      expect(store.filters()).toEqual({});
      expect(store.pagination().page).toBe(1);
      expect(store.pagination().pageSize).toBe(10);
      expect(store.pagination().totalItems).toBe(0);
      expect(store.pagination().totalPages).toBe(0);
    });
    it('should load genres and games on init', async () => {
      mockGamesServiceToDefault();

      vi.advanceTimersByTime(500);

      expect(gameService.getGames).toHaveBeenCalledWith({
        page: 1,
        pageSize: 10,
      });
    });
  });

  describe('Computed signals', () => {
    it('should compute isLoading correctly', () => {
      expect(store.isLoading()).toBe(false);
    });

    it('should compute currentError correctly', () => {
      expect(store.currentError()).toBe(null);
    });

    it('should compute hasActiveFilters correctly', () => {
      expect(store.hasActiveFilters()).toBe(false);

      store.setFilters({ name: 'Game' });
      expect(store.hasActiveFilters()).toBe(true);

      store.setFilters({ developer: 'Dev' });
      expect(store.hasActiveFilters()).toBe(true);

      store.setFilters({ genres: ['Action'] });
      expect(store.hasActiveFilters()).toBe(true);

      store.setFilters({ releaseYear: 2020 });
      expect(store.hasActiveFilters()).toBe(true);
    });
  });

  describe('loadGames', () => {
    it('should load games successfully', async () => {
      mockGamesServiceToDefault();

      store.loadGames({ page: 1, pageSize: 10 });

      vi.advanceTimersByTime(1000);

      expect(gameService.getGames).toHaveBeenCalledWith({
        page: 1,
        pageSize: 10,
      });
      expect(store.games()).toEqual(mockGames);
      expect(store.loading()).toBe(false);
      expect(store.error()).toBe(null);
      expect(store.pagination().page).toBe(1);
      expect(store.pagination().pageSize).toBe(10);
      expect(store.pagination().totalItems).toBe(2);
      expect(store.pagination().totalPages).toBe(1);
      expect(store.allGenres()).toEqual([]);
      expect(store.allDevelopers()).toEqual([]);
    });

    it('should load games with filters', async () => {
      const filters: GameFilters = { name: 'Game', developer: 'Dev' };
      store.setFilters(filters);

      customMockGamesService([mockGames[0]]);

      store.loadGames({ page: 1, pageSize: 10 });

      vi.advanceTimersByTime(1000);

      expect(gameService.getGames).toHaveBeenCalledWith({
        page: 1,
        pageSize: 10,
        name: 'Game',
        developer: 'Dev',
      });
    });

    it('should handle error when loading games', async () => {
      mockGamesServiceWithError();
      store.loadGames({ page: 1, pageSize: 10 });

      vi.advanceTimersByTime(1000);
      expect(store.loading()).toBe(false);
      expect(store.error()).toBe('Failed to load games');
    });

    it('should debounce multiple load calls', async () => {
      mockGamesServiceToDefault();

      store.loadGames({ page: 1, pageSize: 10 });
      store.loadGames({ page: 1, pageSize: 10 });
      store.loadGames({ page: 1, pageSize: 10 });

      vi.advanceTimersByTime(1000);
      expect(gameService.getGames).toHaveBeenCalledTimes(1);
    });

    it('should wait for debounce timeout before making another request', async () => {
      mockGamesServiceToDefault();
      vi.advanceTimersByTime(300);

      store.loadGames({ page: 1, pageSize: 10 });
      vi.advanceTimersByTime(100);
      store.loadGames({ page: 1, pageSize: 10 });
      vi.advanceTimersByTime(100);
      store.loadGames({ page: 1, pageSize: 10 });
      vi.advanceTimersByTime(300);

      expect(gameService.getGames).toHaveBeenCalledTimes(2);
    });

    it('should change page and reload games', async () => {
      gameService.getGames.mockImplementation(
        (page: number, pageSize: number) => {
          return of({
            games: [mockGames[page - 1]],
            total: mockGames.length,
            availableGenres: mockGenres,
          });
        },
      );

      const newPage = 2;
      store.changePage(newPage);

      vi.advanceTimersByTime(1000);

      expect(store.pagination().page).toBe(newPage);
      expect(gameService.getGames).toHaveBeenCalledWith({
        page: newPage,
        pageSize: 10,
      });
    });

    it('should retry loading games after clearing error', async () => {
      const error = new Error('Test error');
      gameService.getGames.mockImplementation(() => throwError(() => error));
      store.loadGames({ page: 1, pageSize: 10 });
      vi.advanceTimersByTime(1000);

      expect(store.error()).toBe('Test error');

      mockGamesServiceToDefault();
      store.retryLoadGames();
      vi.advanceTimersByTime(1000);

      expect(store.error()).toBe(null);
      expect(gameService.getGames).toHaveBeenCalledTimes(2);
      expect(store.loading()).toBe(false);
      expect(store.games()).toEqual(mockGames);
    });
  });

  describe('createGame', () => {
    it('should create a game successfully', async () => {
      gameService.createGame.mockReturnValue(of({}));
      mockGamesServiceToDefault();

      const newGame = {
        name: 'New Game',
        developer: 'New Dev',
        genres: ['Action'],
        releaseYear: 2022,
      };
      const coverFile = new File([''], 'cover.jpg');
      store.createGame({ game: newGame, coverFile });

      vi.advanceTimersByTime(1000);

      expect(gameService.createGame).toHaveBeenCalledWith(newGame, coverFile);
      expect(gameService.getGames).toHaveBeenCalled();
      expect(store.loading()).toBe(false);
      expect(store.error()).toBe(null);
    });

    it('should handle error when creating game', async () => {
      mockGamesServiceToDefault();
      vi.advanceTimersByTime(500);

      const newGame = {
        name: 'New Game',
        developer: 'New Dev',
        genres: ['Action'],
        releaseYear: 2022,
      };
      const coverFile = new File([''], 'cover.jpg');
      const error = new Error('Failed to create game');

      gameService.createGame.mockImplementation(() => throwError(() => error));

      store.createGame({ game: newGame, coverFile });

      expect(store.loading()).toBe(false);
      expect(store.error()).toBe('Failed to create game');
    });
  });

  describe('updateGame', () => {
    it('should update a game successfully', async () => {
      const gameId = 1;
      const changes = { name: 'Updated Game' };
      const updatedGame = { ...mockGames[0], ...changes };

      gameService.getGames.mockReturnValue(
        of({
          games: [mockGames[0]],
          total: 1,
          availableGenres: mockGames[0].genres,
        }),
      );
      vi.advanceTimersByTime(1000);

      gameService.updateGame.mockReturnValue(of(updatedGame));
      store.updateGame({ id: gameId, changes });

      expect(gameService.updateGame).toHaveBeenCalledWith(
        gameId,
        changes,
        undefined,
      );
      expect(store.games().length).toBe(1);
      expect(store.games()).toContainEqual(updatedGame);
      expect(store.loading()).toBe(false);
      expect(store.error()).toBe(null);
    });

    it('should update a game with cover file', async () => {
      mockGamesServiceToDefault();
      vi.advanceTimersByTime(1000);

      const gameId = 1;
      const changes = { name: 'Updated Game' };
      const coverFile = new File([''], 'new-cover.jpg');
      const updatedGame = { ...mockGames[0], ...changes };

      gameService.updateGame.mockReturnValue(updatedGame);

      store.updateGame({ id: gameId, changes, coverFile });

      expect(gameService.updateGame).toHaveBeenCalledWith(
        gameId,
        changes,
        coverFile,
      );
    });

    it('should handle error when updating game', async () => {
      const gameId = 1;
      const changes = { name: 'Updated Game' };
      const error = new Error('Failed to update game');

      gameService.updateGame.mockImplementation(() => throwError(() => error));

      store.updateGame({ id: gameId, changes });

      expect(store.loading()).toBe(false);
      expect(store.error()).toBe('Failed to update game');
    });
  });

  describe('deleteGame', () => {
    it('should delete a game successfully', () => {
      gameService.getGames
        .mockReturnValue(
          // first call
          of({
            games: mockGames,
            total: mockGames.length,
            availableGenres: [...mockGames.map((game) => game.genres[0])],
          }),
        )
        .mockReturnValueOnce(
          // after delete
          of({
            games: mockGames.filter((g) => g.id !== 1),
            total: 1,
            availableGenres: [],
          }),
        );

      const gameId = 1;
      gameService.deleteGame.mockReturnValue(of({}));

      store.deleteGame(gameId);

      vi.advanceTimersByTime(1000);

      expect(gameService.deleteGame).toHaveBeenCalledWith(gameId);
      expect(gameService.getGames).toHaveBeenCalled();
      expect(store.games().length).toBe(1);
      expect(store.loading()).toBe(false);
      expect(store.error()).toBe(null);
    });

    it('should handle error when deleting game', async () => {
      mockGamesServiceToDefault();
      vi.advanceTimersByTime(500);

      const gameId = 1;
      const error = new Error('Failed to delete game');

      gameService.deleteGame.mockImplementation(() => throwError(() => error));

      store.deleteGame(gameId);

      expect(store.loading()).toBe(false);
      expect(store.error()).toBe('Failed to delete game');
    });
  });

  describe('Filters', () => {
    it('should set filters and reload games', async () => {
      mockGamesServiceToDefault();

      const filters: GameFilters = {
        name: 'Game',
        developer: 'Dev',
        genres: ['Action'],
        releaseYear: 2020,
      };

      store.setFilters(filters);

      expect(store.filters()).toEqual(filters);
      expect(store.pagination().page).toBe(1);

      vi.advanceTimersByTime(1000);
      expect(gameService.getGames).toHaveBeenCalledWith({
        page: 1,
        pageSize: 10,
        name: 'Game',
        developer: 'Dev',
        genres: ['Action'],
        releaseYear: 2020,
      });
    });

    it('should filter out empty filter values', async () => {
      mockGamesServiceToDefault();
      const filters: GameFilters = {
        name: '',
        developer: 'Dev',
        genres: [],
        releaseYear: null as any,
      };

      store.setFilters(filters);

      const expectedFilters = { developer: 'Dev' };
      expect(store.filters()).toEqual(expectedFilters);

      vi.advanceTimersByTime(1000);
      expect(gameService.getGames).toHaveBeenCalledWith({
        page: 1,
        pageSize: 10,
        developer: 'Dev',
      });
    });
    it('should maintain filter state when reloading', async () => {
      mockGamesServiceToDefault();
      vi.advanceTimersByTime(500);

      const filters: GameFilters = { name: 'Game', developer: 'Dev' };
      store.setFilters(filters);

      expect(store.filters()).toEqual(filters);

      store.loadGames({ page: 1, pageSize: 10 });
      vi.advanceTimersByTime(500);

      expect(store.filters()).toEqual(filters);
      expect(gameService.getGames).toHaveBeenCalledWith({
        page: 1,
        pageSize: 10,
        name: 'Game',
        developer: 'Dev',
      });
    });

    it('should clear filters and reload games', async () => {
      mockGamesServiceToDefault();

      store.setFilters({ name: 'Test', developer: 'Dev' });
      store.clearFilters();

      vi.advanceTimersByTime(1000);
      expect(store.filters()).toEqual({});
      expect(store.pagination().page).toBe(1);
      expect(gameService.getGames).toHaveBeenCalledWith({
        page: 1,
        pageSize: 10,
      });
    });
    it('should handle genre list properly in parameters', async () => {
      mockGamesServiceToDefault();

      const filters: GameFilters = {
        genres: ['Action', 'Adventure'],
      };

      store.setFilters(filters);

      vi.advanceTimersByTime(1000);

      expect(gameService.getGames).toHaveBeenCalledWith({
        page: 1,
        pageSize: 10,
        genres: filters.genres,
      });
    });

    it('should preserve filters when changing page', async () => {
      mockGamesServiceToDefault();

      const filters: GameFilters = { name: 'Game' };
      store.setFilters(filters);

      store.changePage(2);

      vi.advanceTimersByTime(1000);

      expect(gameService.getGames).toHaveBeenCalledWith({
        page: 2,
        pageSize: 10,
        name: 'Game',
      });
    });
  });
});
