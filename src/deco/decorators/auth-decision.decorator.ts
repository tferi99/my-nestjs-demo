import { USER_DATA_DESCRIPTOR_KEY, UserDataDescriptor } from './user-data.decorator';
import { HttpStatus } from '@nestjs/common';
import { MissingRequiredException } from '../exception/exceptions';
import { Decision, DecisionItem } from '../../decision/decision-types';
import { MARKED_PARAMS_KEY, ParamIndexes } from './param-to-metadata.decorator';

export function AuthDecision(data: DecisionItem) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const origMethod = descriptor.value!;

    if (descriptor.get) {
      const val = descriptor.get();
      console.log('Value is:', val);
    }

    descriptor.value = function (...args) {
      console.log('RunDecision data: ', data);
      console.log('Method parameters: ', args);

      const markedParams: ParamIndexes = Reflect.getOwnMetadata(MARKED_PARAMS_KEY, target, propertyName);
      console.log('Marked mathod parameters: ', markedParams);

      const userDataDesc: UserDataDescriptor = Reflect.getOwnMetadata(USER_DATA_DESCRIPTOR_KEY, target, propertyName);
      console.log('User data descriptor: ', userDataDesc);
      if (userDataDesc !== undefined) {
        console.log('User data: ', args[userDataDesc.parameterIndex]);
        console.log('User ID: ', args[userDataDesc.parameterIndex][userDataDesc.userIdProp]);
      } else {
        throw new MissingRequiredException('Missing UserData - specify @UserData on user parameter', HttpStatus.BAD_REQUEST);
      }
      return origMethod.apply(this, args);
    };
  };
}
