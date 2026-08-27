// Signal Store Principal
export const GameStore = signalStore(
  { providedIn: 'root' },

  // Estado
  withState(initialState),

  // Computed properties
  withComputed((store) => ({
    // Informações de paginação
    paginationInfo: computed(() => ({
      currentPage: store.page(),
      pageSize: store.pageSize(),
      totalItems: store.totalItems(),
      totalPages: Math.ceil(store.totalItems() / store.pageSize()),
    })),

    // Jogo selecionado
    selectedGame: computed(() => {
      const id = store.selectedGameId();
      return store.games().find((g) => g.id === id) || null;
    }),

    // Status de carregamento
    isLoading: computed(() => store.loading()),

    // Erro atual
    currentError: computed(() => store.error()),

    // Filtros ativos (para exibição)
    hasActiveFilters: computed(() => {
      const filters = store.filters();
      return !!(filters.name || filters.developer || filters.genres?.length || filters.releaseYear);
    }),
  })),

  // Métodos
  withMethods((store) => {
    const gameService = inject(GameService);
    const storageService = inject(StorageService);

    // Função interna para construir os parâmetros da requisição
    function buildRequestParams(page: number, pageSize: number, filters: GameFilters) {
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

    return {
      // Carregar jogos com filtros e paginação
      loadGames: rxMethod<{ page?: number; pageSize?: number }>(
        pipe(
          debounceTime(300), // Debounce para evitar múltiplas requisições
          tap(() => patchState(store, { loading: true, error: null })),
          switchMap(({ page = 1, pageSize = 10 }) => {
            const currentFilters = store.filters();
            const params = buildRequestParams(page, pageSize, currentFilters);

            return gameService.getGames(params).pipe(
              tapResponse({
                next: ({ games, total, availableGenres }) => {
                  patchState(store, {
                    games,
                    totalItems: total,
                    loading: false,
                    page,
                    pageSize,
                    availableGenres: availableGenres || store.availableGenres(),
                  });
                },
                error: (error) => {
                  patchState(store, {
                    loading: false,
                    error: error.message || 'Erro ao carregar jogos',
                  });
                },
              }),
            );
          }),
        ),
      ),

      // Carregar gêneros disponíveis (apenas uma vez)
      loadAvailableGenres: rxMethod<void>(
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
                error: (error) => {
                  patchState(store, {
                    loading: false,
                    error: error.message || 'Erro ao carregar gêneros',
                  });
                },
              }),
            );
          }),
        ),
      ),

      // Criar novo jogo
      createGame: rxMethod<{ game: Omit<Game, 'id'>; coverFile: File }>(
        pipe(
          tap(() => patchState(store, { loading: true, error: null })),
          switchMap(({ game, coverFile }) => {
            return gameService.createGame(game, coverFile).pipe(
              tapResponse({
                next: () => {
                  patchState(store, { loading: false });
                  // Recarrega a página atual
                  store.loadGames({
                    page: store.page(),
                    pageSize: store.pageSize(),
                  });
                },
                error: (error) => {
                  patchState(store, {
                    loading: false,
                    error: error.message || 'Erro ao criar jogo',
                  });
                },
              }),
            );
          }),
        ),
      ),

      // Atualizar jogo
      updateGame: rxMethod<{ id: number; changes: Partial<Game>; coverFile?: File }>(
        pipe(
          tap(() => patchState(store, { loading: true, error: null })),
          switchMap(({ id, changes, coverFile }) => {
            return gameService.updateGame(id, changes, coverFile).pipe(
              tapResponse({
                next: (updatedGame) => {
                  const currentGames = store.games();
                  patchState(store, {
                    games: currentGames.map((g) => (g.id === id ? updatedGame : g)),
                    loading: false,
                  });
                },
                error: (error) => {
                  patchState(store, {
                    loading: false,
                    error: error.message || 'Erro ao atualizar jogo',
                  });
                },
              }),
            );
          }),
        ),
      ),

      // Deletar jogo
      deleteGame: rxMethod<number>(
        pipe(
          tap(() => patchState(store, { loading: true, error: null })),
          switchMap((id) => {
            return gameService.deleteGame(id).pipe(
              tapResponse({
                next: () => {
                  patchState(store, { loading: false });
                  // Recarrega a página atual
                  store.loadGames({
                    page: store.page(),
                    pageSize: store.pageSize(),
                  });
                },
                error: (error) => {
                  patchState(store, {
                    loading: false,
                    error: error.message || 'Erro ao deletar jogo',
                  });
                },
              }),
            );
          }),
        ),
      ),

      // Definir filtros (recarrega do servidor)
      setFilters(filters: GameFilters) {
        // Remove filtros vazios
        const cleanFilters: GameFilters = {};
        if (filters.name) cleanFilters.name = filters.name;
        if (filters.developer) cleanFilters.developer = filters.developer;
        if (filters.genres?.length) cleanFilters.genres = filters.genres;
        if (filters.releaseYear) cleanFilters.releaseYear = filters.releaseYear;

        patchState(store, {
          filters: cleanFilters,
          page: 1, // Reseta página ao filtrar
        });

        // Recarrega com os novos filtros
        store.loadGames({ page: 1, pageSize: store.pageSize() });
      },

      // Limpar filtros
      clearFilters() {
        patchState(store, {
          filters: {},
          page: 1,
        });
        store.loadGames({ page: 1, pageSize: store.pageSize() });
      },

      // Mudar página
      changePage(page: number) {
        patchState(store, { page });
        store.loadGames({ page, pageSize: store.pageSize() });
      },

      // Mudar tamanho da página
      changePageSize(pageSize: number) {
        patchState(store, {
          pageSize,
          page: 1,
        });
        store.loadGames({ page: 1, pageSize });
      },

      // Selecionar jogo
      selectGame(id: number | null) {
        patchState(store, { selectedGameId: id });
      },

      // Limpar erro
      clearError() {
        patchState(store, { error: null });
      },

      // Upload de imagem (método auxiliar)
      uploadCover(file: File) {
        return storageService.uploadCover(file);
      },
    };
  }),

  // Hooks do ciclo de vida
  withHooks((store) => ({
    onInit() {
      // Carrega gêneros disponíveis e jogos ao inicializar
      store.loadAvailableGenres();
      store.loadGames({ page: 1, pageSize: 10 });
    },
  })),
);
