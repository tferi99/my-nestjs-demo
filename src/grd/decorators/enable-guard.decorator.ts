import { SetMetadata } from '@nestjs/common';

export const ENABLE_GUARD_KEY = 'G2_grd_kill';
/*export function EnableGuard(enabled: boolean) {
  return (...args : any[]) => {
    SetMetadata(ENABLE_GUARD_KEY, enabled);
    console.log(`SetMetadata(${ENABLE_GUARD_KEY}, ${enabled})`);
  };
}
*/
/*
export function EnableGuard(enabled: boolean) {
  SetMetadata(ENABLE_GUARD_KEY, enabled);
  return (...args : any[]) => {
    SetMetadata(ENABLE_GUARD_KEY, enabled);
    console.log(`SetMetadata(${ENABLE_GUARD_KEY}, ${enabled})`);
  };
}
*/

export enum Global1GuardTarget {
  G1, // Global1Guard
  G2, // Global2Guard
}

export interface GuardConfig {
  target: string | Global1GuardTarget;
  enabled: boolean;
}

export const EnableGuard = (guardConfig: GuardConfig) => {
  console.log('EnableGuard()', guardConfig);
  return SetMetadata(ENABLE_GUARD_KEY, guardConfig.enabled);
}

