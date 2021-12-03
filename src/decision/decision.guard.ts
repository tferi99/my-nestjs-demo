import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Reflector } from '@nestjs/core';
import { Decision } from './decision-types';
import { DECISION_DATA_KEY, DECISION_ARGS_PARAMS_KEY } from './decision-expr.decorator';
import { DecisionProcessorSevice } from './decision-processor.service';
import { ParamIndexes, PARAMS_IDS_KEY } from '../deco/decorators/param-to-metadata.decorator';

@Injectable()
export class DecisionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
//    private decisionProcessorSevice: DecisionProcessorSevice,
//    private authService: AuthService
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    console.log('DecisionGuard.canActivate()');
    const roles: string[] = this.reflector.get<string[]>('roles', context.getHandler());
    const decisionData: Decision = this.reflector.get<Decision>(DECISION_DATA_KEY, context.getHandler());
    const methodArgs = this.reflector.get<any[]>(DECISION_ARGS_PARAMS_KEY, context.getHandler());
    const paramIds = this.reflector.get<ParamIndexes>(PARAMS_IDS_KEY, context.getHandler());
    const h: any = context.getHandler();

    console.log('  DecisionGuard - roles:', roles);
    console.log('  DecisionGuard - decisonData:', decisionData);
    console.log('  DecisionGuard - methodArgs:', h);
    console.log('  DecisionGuard - paramIds:', paramIds);


    //return this.decisionProcessorSevice.process(decisionData, methodArgs);
    return true;
  }
}
