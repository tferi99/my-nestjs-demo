import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { USER_DATA_DESCRIPTOR_KEY } from '../decorators/user-data.decorator';

@Injectable()
export class CheckUserGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const userData = this.reflector.get<string[]>(USER_DATA_DESCRIPTOR_KEY, context.getArgs);
    console.log('CheckUserGuard: ', userData);
    return true;
  }
}
