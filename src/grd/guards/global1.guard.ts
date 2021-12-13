import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import {
  ENABLE_GUARD_CONFIGS_KEY,
  GUARD_ENABLED_DEFAULT,
  GuardConfig,
  GuardTarget,
} from '../decorators/enable-guard.decorator';

@Injectable()
export class Global1Guard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    let enabled = GUARD_ENABLED_DEFAULT
    const existingGuardConfigs = this.reflector.get<Map<GuardTarget, GuardConfig>>(ENABLE_GUARD_CONFIGS_KEY, context.getHandler());
    const handler = context.getHandler();
    const e2 = this.reflector.get<Map<GuardTarget, GuardConfig>>(ENABLE_GUARD_CONFIGS_KEY, context.getHandler());
    console.log('existingGuardConfigs:', existingGuardConfigs);
    if (existingGuardConfigs !== undefined) {
      const cfg = existingGuardConfigs.get(GuardTarget.G1);
      if (cfg !== undefined) {
        enabled = cfg.enabled;
      }
    }
    console.log('Global1Guard - enabled:' + enabled);
    return enabled;
  }
}
