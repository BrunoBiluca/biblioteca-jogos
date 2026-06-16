import { HlmAutocompleteImports } from '@/common/ui/autocomplete/src';
import { CommonModule } from '@angular/common';
import { Component, resource, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideImage, lucidePlusCircle, lucideText } from '@ng-icons/lucide';

@Component({
  selector: 'app-game-registration-form',
  imports: [NgIconComponent, HlmAutocompleteImports, CommonModule],
  providers: [provideIcons({ lucideText, lucidePlusCircle, lucideImage, lucideCheck })],
  templateUrl: './game-registration-form.html',
})
export class GameRegistrationForm {
  readonly search = signal('');

  itemToString = (item: any) => item.title;

  options = resource({
    defaultValue: [],
    params: () => ({ search: this.search() }),
    loader: async ({ params }) => {
      const search = params.search;

      if (search.length === 0) {
        return [];
      }

      return await this.searchDevelopers(search.toLowerCase());
    },
  });

  searchDevelopers(search: string): Promise<any[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.developers.filter((d) => d.name.toLowerCase().includes(search)));
      }, 1000);
    });
  }

  developers = [
    { name: 'Nintendo EAD', country: 'Japan', foundation: 1889 },
    { name: 'Blizzard Entertainment', country: 'USA', foundation: 1991 },
    { name: 'Ubisoft Montreal', country: 'Canada', foundation: 1997 },
    { name: 'Electronic Arts (EA)', country: 'USA', foundation: 1982 },
    { name: 'Activision', country: 'USA', foundation: 1979 },
    { name: 'Sony Interactive Entertainment', country: 'Japan/USA', foundation: 1993 },
    { name: 'Sega', country: 'Japan', foundation: 1960 },
    { name: 'Game Freak', country: 'Japan', foundation: 1989 },
    { name: 'Infinity Ward', country: 'USA', foundation: 2002 },
    { name: 'Harmonix', country: 'USA', foundation: 1995 },
    { name: 'Maxis', country: 'USA', foundation: 1987 },
    { name: 'Westwood Studios', country: 'USA', foundation: 1985 },
    { name: 'Black Isle Studios', country: 'USA', foundation: 1996 },
    { name: 'HAL Laboratory', country: 'Japan', foundation: 1980 },
    { name: 'Retro Studios', country: 'USA', foundation: 1998 },
    { name: 'Tango Gameworks', country: 'Japan', foundation: 2010 },
    { name: 'Square Enix', country: 'Japan', foundation: 2003 },
    { name: 'Valve Corporation', country: 'USA', foundation: 1996 },
    { name: 'Rockstar Games', country: 'USA', foundation: 1998 },
    { name: 'Capcom', country: 'Japan', foundation: 1979 },
    { name: 'Konami', country: 'Japan', foundation: 1969 },
    { name: 'Bandai Namco', country: 'Japan', foundation: 2005 },
    { name: 'Thatgamecompany', country: 'USA', foundation: 2006 },
    { name: 'Insomniac Games', country: 'USA', foundation: 1994 },
    { name: 'CD Projekt Red', country: 'Poland', foundation: 2002 },
    { name: 'Atari', country: 'USA', foundation: 1972 },
    { name: 'MicroProse', country: 'USA', foundation: 1982 },
    { name: 'Irrational Games', country: 'USA', foundation: 1997 },
    { name: 'Looking Glass Studios', country: 'USA', foundation: 1990 },
    { name: 'Origin Systems', country: 'USA', foundation: 1983 },
    { name: 'Intelligent Systems', country: 'Japan', foundation: 1986 },
    { name: 'Relic Entertainment', country: 'Canada', foundation: 1997 },
    { name: 'The Creative Assembly', country: 'UK', foundation: 1987 },
    { name: 'Bungie', country: 'USA', foundation: 1991 },
    { name: 'Naughty Dog', country: 'USA', foundation: 1984 },
    { name: 'Bethesda Game Studios', country: 'USA', foundation: 2001 },
    { name: 'BioWare', country: 'Canada', foundation: 1995 },
    { name: 'Epic Games', country: 'USA', foundation: 1991 },
    { name: 'id Software', country: 'USA', foundation: 1991 },
    { name: 'Level-5', country: 'Japan', foundation: 1998 },
    { name: 'Rare', country: 'UK', foundation: 1985 },
    { name: 'Neversoft', country: 'USA', foundation: 1994 },
    { name: 'LucasArts', country: 'USA', foundation: 1982 },
    { name: 'PopCap Games', country: 'USA', foundation: 2000 },
    { name: 'Sierra Entertainment', country: 'USA', foundation: 1979 },
    { name: 'Treasure', country: 'Japan', foundation: 1992 },
    { name: 'Polyphony Digital', country: 'Japan', foundation: 1994 },
  ];

  genres = [
    'Action',
    'Adventure',
    'Casual',
    'Free to Play',
    'Indie',
    'Massively Multiplayer',
    'Platformer',
    'RPG',
    'Racing',
    'Simulation',
    'Sports',
    'Strategy',
  ];

  selectedGenres = signal<string[]>([]);

  isGenreSelected(genre: string) {
    return this.selectedGenres().includes(genre);
  }

  toggleGenre(genre: string) {
    if (this.isGenreSelected(genre)) {
      this.selectedGenres.update((genres) => genres.filter((g) => g !== genre));
    } else {
      this.selectedGenres.update((genres) => [...genres, genre]);
    }
  }
}
