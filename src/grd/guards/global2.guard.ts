import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ENABLE_GUARD_KEY } from '../decorators/enable-guard.decorator';

@Injectable()
export class Global2Guard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const enabled = this.reflector.getAllAndOverride<boolean>(ENABLE_GUARD_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('Global2Guard - enabled:' + enabled);
    if (enabled != undefined) {
      return enabled;
    }
    return true; // by default enabled
  }
}
