import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideBookOpen, lucideGamepad2, lucideRocket, lucideSwords } from '@ng-icons/lucide';
import { SelectorGrid } from './components/selector-grid/selector-grid';
import { SelectorGridSimple } from './components/selector-grid-simple/selector-grid-simple';

@Component({
  selector: 'app-challengue-registration-form',
  imports: [NgIconComponent, SelectorGrid, SelectorGridSimple],
  providers: [
    provideIcons({
      lucideGamepad2,
      lucideSwords,
      lucideBookOpen,
      lucideRocket,
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
}
