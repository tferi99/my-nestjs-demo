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
export class Test2Guard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    let enabled = GUARD_ENABLED_DEFAULT
    const existingGuardConfigs = this.reflector.get<Map<GuardTarget, GuardConfig>>(ENABLE_GUARD_CONFIGS_KEY, context.getHandler());
    if (existingGuardConfigs !== undefined) {
      const cfg = existingGuardConfigs.get(GuardTarget.T2);
      if (cfg !== undefined) {
        enabled = cfg.enabled;
      }
    }
    console.log('Test2Guard - enabled:' + enabled);
    return enabled;
  }
}
