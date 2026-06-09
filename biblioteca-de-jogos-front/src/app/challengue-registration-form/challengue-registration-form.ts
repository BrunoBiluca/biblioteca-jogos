import { Component, resource, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  lucideBookOpen,
  lucideGamepad2,
  lucideLoader,
  lucideRocket,
  lucideSwords,
} from '@ng-icons/lucide';
import { SelectorGrid } from './components/selector-grid/selector-grid';
import { SelectorGridSimple } from './components/selector-grid-simple/selector-grid-simple';

import { HlmAutocompleteImports } from '@ui/autocomplete';

@Component({
  selector: 'app-challengue-registration-form',
  imports: [NgIconComponent, SelectorGrid, SelectorGridSimple, HlmAutocompleteImports],
  providers: [
    provideIcons({
      lucideGamepad2,
      lucideSwords,
      lucideBookOpen,
      lucideRocket,
      lucideLoader,
    }),
  ],
  templateUrl: './challengue-registration-form.html',
})
export class ChallengueRegistrationForm {
  challengueTypes = [
    {
      icon: 'lucideBookOpen',
      label: 'História principal',
      description: 'Experiência da narrativa central.',
      value: 'main_story',
    },
    {
      icon: 'lucideBookOpen',
      label: 'História secundária',
      description: 'Missões e arcos opcionais.',
      value: 'secondary_story',
    },
    {
      icon: 'lucideBookOpen',
      label: 'História alternativa',
      description: 'Caminhos e finais diferentes.',
      value: 'alternative_story',
    },
    {
      icon: 'lucideBookOpen',
      label: 'Competitivo',
      description: 'focado em rankings e disputas.',
      value: 'competitive',
    },
    {
      icon: 'lucideBookOpen',
      label: 'Desafio principal',
      description: 'Testes de habilidade de alto nível.',
      value: 'main_challenge',
    },
  ];

  platforms = [
    {
      label: 'PC',
      value: 'pc',
    },
    {
      label: 'Playstation',
      value: 'playstation',
    },
    {
      label: 'Steam Deck',
      value: 'steam_deck',
    },
  ];

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

      return await this.searchGames(search.toLowerCase());
    },
  });

  searchGames(search: string): Promise<any[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.games.filter((game) => game.title.toLowerCase().includes(search)));
      }, 1000);
    });
  }

  games = [
    { title: 'The Legend of Zelda: Breath of the Wild', year: 2017 },
    { title: 'Red Dead Redemption 2', year: 2018 },
    { title: 'God of War (2018)', year: 2018 },
    { title: 'The Witcher 3: Wild Hunt', year: 2015 },
    { title: 'Grand Theft Auto V', year: 2013 },
    { title: 'Super Mario Odyssey', year: 2017 },
    { title: 'Elden Ring', year: 2022 },
    { title: 'Cyberpunk 2077', year: 2020 },
    { title: 'Minecraft', year: 2011 },
    { title: 'Fortnite', year: 2017 },
    { title: 'Call of Duty: Modern Warfare', year: 2019 },
    { title: 'League of Legends', year: 2009 },
    { title: 'Counter-Strike: Global Offensive', year: 2012 },
    { title: 'Valorant', year: 2020 },
    { title: 'Among Us', year: 2018 },
    { title: 'Fall Guys', year: 2020 },
    { title: 'Animal Crossing: New Horizons', year: 2020 },
    { title: 'Final Fantasy VII Remake', year: 2020 },
    { title: 'Persona 5 Royal', year: 2019 },
    { title: 'Dark Souls III', year: 2016 },
    { title: 'Sekiro: Shadows Die Twice', year: 2019 },
    { title: 'Bloodborne', year: 2015 },
    { title: 'Ghost of Tsushima', year: 2020 },
    { title: 'Horizon Zero Dawn', year: 2017 },
    { title: 'Spider-Man: Miles Morales', year: 2020 },
    { title: "Uncharted 4: A Thief's End", year: 2016 },
    { title: 'The Last of Us Part II', year: 2020 },
    { title: 'Death Stranding', year: 2019 },
    { title: 'Resident Evil Village', year: 2021 },
    { title: 'Doom Eternal', year: 2020 },
    { title: 'Hades', year: 2020 },
    { title: 'Celeste', year: 2018 },
    { title: 'Hollow Knight', year: 2017 },
    { title: 'Ori and the Blind Forest', year: 2015 },
    { title: 'Cuphead', year: 2017 },
    { title: 'Stardew Valley', year: 2016 },
    { title: 'Terraria', year: 2011 },
    { title: 'Rocket League', year: 2015 },
    { title: 'Apex Legends', year: 2019 },
    { title: 'Overwatch', year: 2016 },
    { title: 'Rainbow Six Siege', year: 2015 },
    { title: 'Destiny 2', year: 2017 },
    { title: 'World of Warcraft', year: 2004 },
    { title: 'Final Fantasy XIV', year: 2013 },
    { title: 'Genshin Impact', year: 2020 },
    { title: 'Pokémon Sword and Shield', year: 2019 },
    { title: 'Super Smash Bros. Ultimate', year: 2018 },
    { title: 'Mario Kart 8 Deluxe', year: 2017 },
    { title: 'Splatoon 2', year: 2017 },
    { title: 'Tetris 99', year: 2019 },
  ];
}
