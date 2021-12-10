import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  ENABLE_GUARD_CONFIGS_KEY,
  GUARD_ENABLED_DEFAULT,
  GuardConfig,
  GuardTarget,
} from '../decorators/enable-guard.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class Test1Guard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    let enabled = GUARD_ENABLED_DEFAULT
    const existingGuardConfigs = this.reflector.get<Map<GuardTarget, GuardConfig>>(ENABLE_GUARD_CONFIGS_KEY, context.getHandler());
    if (existingGuardConfigs !== undefined) {
      const cfg = existingGuardConfigs.get(GuardTarget.T1);
      if (cfg !== undefined) {
        enabled = cfg.enabled;
      }
    }
    console.log('Test1Guard - enabled:' + enabled);
    return enabled;
  }
}
