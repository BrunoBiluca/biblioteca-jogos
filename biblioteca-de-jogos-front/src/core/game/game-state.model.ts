import { Game } from './game.model';
import { GameFilters } from './game-filters.model';
import { initialPagination, Pagination } from './pagination.model';

export interface GameState {
  games: Game[];
  loading: boolean;
  error: string | null;
  filters: GameFilters;
  pagination: Pagination;
  availableGenres: string[] | undefined;
}

export const initialGameState: GameState = {
  games: [],
  loading: false,
  error: null,
  filters: {},
  pagination: initialPagination,
  availableGenres: [],
};
