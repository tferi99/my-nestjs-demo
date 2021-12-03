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

export const EnableGuard = (enabled: boolean) => SetMetadata(ENABLE_GUARD_KEY, enabled);
