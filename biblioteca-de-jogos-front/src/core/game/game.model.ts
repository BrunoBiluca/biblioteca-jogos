export class Game {
  id!: number;
  name!: string;
  cover!: string;
  coverFile!: File;
  developer!: string;
  releaseDate!: Date;
  genres!: string[];
  description?: string;
  synopsis?: string;
}
