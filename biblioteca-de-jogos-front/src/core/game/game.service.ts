import { Injectable } from '@angular/core';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export class Game {
  id!: number;
  name!: string;
  cover!: string;
  developer!: string;
  releaseYear!: number;
  genres!: string[];
}

export interface GameFilters {
  name?: string;
  developer?: string;
  genres?: string[];
  releaseYear?: number;
}

export interface Pagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface GameState {
  games: Game[];
  loading: boolean;
  error: string | null;
  filters: GameFilters;
  pagination: Pagination;
}

export const initialGameState: GameState = {
  games: [],
  loading: false,
  error: null,
  filters: {},
  pagination: {
    page: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  },
};

@Injectable()
export abstract class GameService {}
