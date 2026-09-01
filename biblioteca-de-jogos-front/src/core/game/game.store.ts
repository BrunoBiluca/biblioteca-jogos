import { computed, inject } from '@angular/core';
import { debounceTime, of, pipe, switchMap, tap } from 'rxjs';
import {
  patchState,
  signalStore,
  withState,
  withMethods,
  withComputed,
  withHooks,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { GameService } from './game.service';
import { GameFilters } from './game-filters.model';
import { Game } from './game.model';
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
      if (filters.genres?.length) params.genres = filters.genres;
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
              next: ({ games, total, allGenres, allDevelopers }) => {
                patchState(store, {
                  games,
                  loading: false,
                  pagination: {
                    page,
                    pageSize,
                    totalItems: total,
                    totalPages: Math.ceil(total / pageSize),
                  },
                  allGenres: allGenres || store.allGenres(),
                  allDevelopers: allDevelopers || store.allDevelopers(),
                });
              },
              error: (error: Error) => {
                console.error(error);
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

    const getGameById = rxMethod<{ gameId: number }>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(({ gameId }) => {
          const cachedGame = store.games().find((g) => g.id === gameId);
          if (cachedGame) {
            patchState(store, {
              loading: false,
            });
            return of(cachedGame);
          }

          return gameService.getGameById(gameId).pipe(
            tapResponse({
              next: (game) => {
                patchState(store, {
                  loading: false,
                });
                return game;
              },
              error: (error: Error) => {
                console.error(error);
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

    const createGame = rxMethod<{
      game: Omit<Game, 'id' | 'cover'>;
      coverFile: File;
    }>(
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
                const updatedGames = currentGames.map((g) =>
                  g.id === id ? updatedGame : g,
                );
                patchState(store, {
                  games: updatedGames,
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

    const retryLoadGames = () => {
      loadGames({
        page: store.pagination.page(),
        pageSize: store.pagination.pageSize(),
      });
    };

    return {
      loadGames,
      getGameById,
      createGame,
      updateGame,
      deleteGame,
      setFilters,
      clearFilters,
      changePage,
      retryLoadGames,
    };
  }),

  withHooks((store) => ({
    onInit() {
      store.loadGames({ page: 1, pageSize: 10 });
    },
  })),
);
