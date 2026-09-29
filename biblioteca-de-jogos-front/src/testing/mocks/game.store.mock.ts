import { GameStore } from '@/core/game/game.store';
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideGameServiceMock } from './game.service.mock';

export function provideGameStoreMock(): EnvironmentProviders {
  return makeEnvironmentProviders([provideGameServiceMock(), GameStore]);
}
