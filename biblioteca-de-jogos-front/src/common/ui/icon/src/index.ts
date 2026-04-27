import { NgIcon } from '@ng-icons/core';
import { HlmIcon } from './lib/hlm-icon';

export * from './lib/hlm-icon';
export * from './lib/hlm-icon.token';

export const HlmIconImports: any[] = [HlmIcon, NgIcon] as const;
