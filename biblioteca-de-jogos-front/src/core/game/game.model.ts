export class Game {
  id!: number;
  name!: string;
  cover!: string;
  coverFile!: File;
  developer!: string;
  releaseYear!: number;
  genres!: string[];
  description?: string;
  synopsis?: string;
}
