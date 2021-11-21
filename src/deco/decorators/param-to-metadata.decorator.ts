import { User } from '../../model/user';
import { createParamDecorator, ExecutionContext, HttpException, HttpStatus, SetMetadata } from '@nestjs/common';
import { DuplicatedException } from '../exception/exceptions';

export const MARKED_PARAMS_KEY = 'MarkedParams';

export function MarkedParam(id: string): any {
  return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
    const existingParameters: ParamIndexes = Reflect.getOwnMetadata(MARKED_PARAMS_KEY, target, propertyKey) || new Map<string, number>();
    const existing = existingParameters.get(id);
    if (existing) {
      throw new DuplicatedException('Parameter already marked with this id: ' + id, HttpStatus.EXPECTATION_FAILED);
    }
    existingParameters.set(id, parameterIndex);
    Reflect.defineMetadata(MARKED_PARAMS_KEY, existingParameters, target, propertyKey);
  };
}

export type ParamIndexes = Map<string, number>;
