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

export enum Global1GuardTarget {
  G1, // Global1Guard
  G2, // Global2Guard
}

export interface GuardConfig {
  target: string | Global1GuardTarget;
  enabled: boolean;
}

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
    let configs: Map<Global1GuardTarget | string, GuardConfig> = Reflect.getMetadata(ENABLE_GUARD_CONFIGS_KEY, target, propertyKey);
    if (configs === undefined) {
      configs = new Map<Global1GuardTarget | string, GuardConfig>();
      Reflect.defineMetadata(ENABLE_GUARD_CONFIGS_KEY, configs, descriptor.value);
    }
    configs.set(guardConfig.target, guardConfig);
  }
  return factory;
}
let result = Reflect.getMetadata(metadataKey, target, propertyKey);
