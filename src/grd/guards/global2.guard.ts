import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { G2_GRD_KILL_KEY } from '../decorators/global2-guard-kill';

@Injectable()
export class Global2Guard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const kill = this.reflector.getAllAndOverride<boolean>(G2_GRD_KILL_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('Global2Guard - kill:' + kill);
    if (kill) {
      return false;
    }
    return true;
  }
}
