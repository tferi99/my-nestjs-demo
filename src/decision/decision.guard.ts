import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Reflector } from '@nestjs/core';
import { Decision } from './decision-types';
import { DECISION_DATA_KEY } from './auth-decision.decorator';
import { DecisionProcessorSevice } from './decision-processor.service';

@Injectable()
export class DecisionGuard implements CanActivate {
  constructor(private reflector: Reflector, private decisionProcessorSevice: DecisionProcessorSevice, private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const decisionData = this.reflector.get<Decision>(DECISION_DATA_KEY, context.getHandler);
    const methodArgs = this.reflector.get<any[]>(DECISION_DATA_KEY, context.getHandler);

    console.log('DecisionGuard - decisonData:', decisionData)
    console.log('DecisionGuard - methodArgs:', methodArgs)

    return this.decisionProcessorSevice.process(decisionData, methodArgs);
  }
}
