import { Game } from './game.model';
import { GameFilters } from './game-filters.model';
import { initialPagination, Pagination } from './pagination.model';

export interface GameState {
  games: Game[];
  loading: boolean;
  error: string | null;
  filters: GameFilters;
  pagination: Pagination;
  allGenres: string[] | undefined;
  allDevelopers: string[] | undefined;
  currentGame: Game | null;
}

export const initialGameState: GameState = {
  games: [],
  loading: false,
  error: null,
  filters: {},
  pagination: initialPagination,
  allGenres: [],
  allDevelopers: [],
  currentGame: null,
};
