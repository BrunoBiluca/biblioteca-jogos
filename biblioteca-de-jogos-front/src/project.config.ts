import { InjectionToken } from '@angular/core';

const PROJECT_CONFIG = {
  platform: {
    name: 'Biblioteca de Jogos',
    version: '1.0.0',
  },
  timeline: {
    startYear: 2025,
    currentYear: new Date().getFullYear(),
    getYearsActive() {
      return [...new Array(this.currentYear - this.startYear + 1).keys()].map(
        (year) => year + this.startYear,
      );
    },
  },
  branding: {
    companyName: 'Biluca Studios',
    copyright: `© Biluca Studios ${new Date().getFullYear()}`,
  },
} as const;

export const PROJECT_CONFIG_TOKEN = new InjectionToken<typeof PROJECT_CONFIG>('project.config', {
  providedIn: 'root',
  factory: () => PROJECT_CONFIG,
});
