import { SetMetadata } from '@nestjs/common';

export const ENABLE_GUARD_KEY = 'EnableGuard';
export const ENABLE_GUARD_CONFIGS_KEY = 'EnableGuardConfigs';
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

export enum GuardTarget {
  G1 = 'G1', // Global1Guard
  G2 = 'G2', // Global2Guard
  T1 = 'T1', // Test1Guard
  T2 = 'T2', // Test2Guard
}

export interface GuardConfig {
  target: GuardTarget;
  enabled: boolean;
}

export const GUARD_ENABLED_DEFAULT = true;

/*export const EnableGuard = (guardConfig: GuardConfig) => {
  console.log('EnableGuard()', guardConfig);
  return SetMetadata(ENABLE_GUARD_KEY, guardConfig.enabled);
}*/

/*
export const EnableGuard = (guardConfig: GuardConfig) => {
  const factory = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(ENABLE_GUARD_KEY, guardConfig.enabled, descriptor.value);
  }
  return factory;
}
*/
export const EnableGuard = (guardConfig: GuardConfig) => {
  const factory = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const existingGuardConfigs: Map<GuardTarget, GuardConfig> = Reflect.getOwnMetadata(ENABLE_GUARD_CONFIGS_KEY, target, propertyKey) || new Map<GuardTarget, GuardConfig>();
    Reflect.defineMetadata(ENABLE_GUARD_CONFIGS_KEY, existingGuardConfigs, descriptor.value);

    existingGuardConfigs.set(guardConfig.target, guardConfig);
    Reflect.defineMetadata( ENABLE_GUARD_CONFIGS_KEY, existingGuardConfigs, target, propertyKey);

    console.log('EnableGuard changed:', existingGuardConfigs);
  }
  return factory;
}

