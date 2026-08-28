import { computed, inject } from '@angular/core';
import { GameService } from './game.service';
import { GameFilters } from './game-filters.model';
import { Game } from './game.model';
import {
  patchState,
  signalStore,
  withState,
  withMethods,
  withComputed,
  withHooks,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { StorageService } from './storage.service';
import { debounceTime, pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { initialGameState } from './game-state.model';

export const GameStore = signalStore(
  { providedIn: 'root' },

  withState(initialGameState),

  withComputed((store) => ({
    isLoading: computed(() => store.loading()),

    currentError: computed(() => store.error()),

    hasActiveFilters: computed(() => {
      const filters = store.filters();
      return !!(
        filters.name ||
        filters.developer ||
        filters.genres?.length ||
        filters.releaseYear
      );
    }),
  })),

  withMethods((store) => {
    const gameService = inject(GameService);
    const storageService = inject(StorageService);

    function buildRequestParams(
      page: number,
      pageSize: number,
      filters: GameFilters,
    ) {
      const params: any = {
        page,
        pageSize,
      };

      if (filters.name) params.name = filters.name;
      if (filters.developer) params.developer = filters.developer;
      if (filters.genres?.length) params.genres = filters.genres.join(',');
      if (filters.releaseYear) params.releaseYear = filters.releaseYear;

      return params;
    }

    const loadGames = rxMethod<{ page?: number; pageSize?: number }>(
      pipe(
        debounceTime(300),
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(({ page = 1, pageSize = 10 }) => {
          const currentFilters = store.filters();
          const params = buildRequestParams(page, pageSize, currentFilters);

          return gameService.getGames(params).pipe(
            tapResponse({
              next: ({ games, total, availableGenres }) => {
                patchState(store, {
                  games,
                  loading: false,
                  pagination: {
                    page,
                    pageSize,
                    totalItems: total,
                    totalPages: Math.ceil(total / pageSize),
                  },
                  availableGenres: availableGenres || store.availableGenres(),
                });
              },
              error: (error: Error) => {
                patchState(store, {
                  loading: false,
                  error: error.message || 'Erro ao carregar jogos',
                });
              },
            }),
          );
        }),
      ),
    );

    const loadAvailableGenres = rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(() => {
          return gameService.getAvailableGenres().pipe(
            tapResponse({
              next: (genres) => {
                patchState(store, {
                  availableGenres: genres,
                  loading: false,
                });
              },
              error: (error: Error) => {
                patchState(store, {
                  loading: false,
                  error: error.message || 'Erro ao carregar gêneros',
                });
              },
            }),
          );
        }),
      ),
    );

    const createGame = rxMethod<{ game: Omit<Game, 'id'>; coverFile: File }>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(({ game, coverFile }) => {
          return gameService.createGame(game, coverFile).pipe(
            tapResponse({
              next: () => {
                patchState(store, { loading: false });
                loadGames({
                  page: store.pagination.page(),
                  pageSize: store.pagination.pageSize(),
                });
              },
              error: (error: Error) => {
                patchState(store, {
                  loading: false,
                  error: error.message || 'Erro ao criar jogo',
                });
              },
            }),
          );
        }),
      ),
    );

    const updateGame = rxMethod<{
      id: number;
      changes: Partial<Game>;
      coverFile?: File;
    }>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(({ id, changes, coverFile }) => {
          return gameService.updateGame(id, changes, coverFile).pipe(
            tapResponse({
              next: (updatedGame) => {
                const currentGames = store.games();
                patchState(store, {
                  games: currentGames.map((g) =>
                    g.id === id ? updatedGame : g,
                  ),
                  loading: false,
                });
              },
              error: (error: Error) => {
                patchState(store, {
                  loading: false,
                  error: error.message || 'Erro ao atualizar jogo',
                });
              },
            }),
          );
        }),
      ),
    );

    const deleteGame = rxMethod<number>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap((id) => {
          return gameService.deleteGame(id).pipe(
            tapResponse({
              next: () => {
                patchState(store, { loading: false });
                loadGames({
                  page: store.pagination.page(),
                  pageSize: store.pagination.pageSize(),
                });
              },
              error: (error: Error) => {
                patchState(store, {
                  loading: false,
                  error: error.message || 'Erro ao deletar jogo',
                });
              },
            }),
          );
        }),
      ),
    );

    const setFilters = (filters: GameFilters) => {
      const cleanFilters: GameFilters = {};
      if (filters.name) cleanFilters.name = filters.name;
      if (filters.developer) cleanFilters.developer = filters.developer;
      if (filters.genres?.length) cleanFilters.genres = filters.genres;
      if (filters.releaseYear) cleanFilters.releaseYear = filters.releaseYear;

      const pageSize = store.pagination.pageSize();

      patchState(store, {
        filters: cleanFilters,
        pagination: {
          page: 1,
          pageSize,
          totalItems: 0,
          totalPages: 0,
        },
      });

      loadGames({ page: 1, pageSize });
    };

    const clearFilters = () => {
      const pageSize = store.pagination.pageSize();
      patchState(store, {
        filters: {},
        pagination: {
          page: 1,
          pageSize,
          totalItems: 0,
          totalPages: 0,
        },
      });
      loadGames({ page: 1, pageSize });
    };

    const changePage = (page: number) => {
      const pageSize = store.pagination.pageSize();
      patchState(store, {
        pagination: {
          page,
          pageSize,
          totalItems: store.pagination.totalItems(),
          totalPages: store.pagination.totalPages(),
        },
      });
      loadGames({ page, pageSize });
    };

    const clearError = () => {
      patchState(store, { error: null });
    };

    const uploadCover = (file: File) => {
      return storageService.uploadCover(file);
    };

    return {
      loadGames,
      loadAvailableGenres,
      createGame,
      updateGame,
      deleteGame,
      setFilters,
      clearFilters,
      changePage,
      clearError,
    };
  }),

  withHooks((store) => ({
    onInit() {
      store.loadAvailableGenres();
      store.loadGames({ page: 1, pageSize: 10 });
    },
  })),
);
