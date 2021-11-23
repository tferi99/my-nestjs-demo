import { USER_DATA_DESCRIPTOR_KEY, UserDataDescriptor } from './user-data.decorator';
import { HttpStatus } from '@nestjs/common';
import { MissingRequiredException } from '../exception/exceptions';
import { DecisionItem } from '../../decision/decision-types';
import { MARKED_PARAMS_KEY, ParamIndexes } from './param-to-metadata.decorator';

export function AuthDecision(data: DecisionItem) {
  const prefix = '# AuthDecision: ';

  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const origMethod = descriptor.value!;

    if (descriptor.get) {
      const val = descriptor.get();
      console.log('Value is:', val);
    }

    descriptor.value = function (...args) {
      console.log(prefix + 'data: ', data);
      console.log(prefix + 'Method parameters: ', args);

      const markedParams: ParamIndexes = Reflect.getOwnMetadata(MARKED_PARAMS_KEY, target, propertyName);
      console.log(prefix + 'Marked mathod parameters: ', markedParams);

      const userDataDesc: UserDataDescriptor = Reflect.getOwnMetadata(USER_DATA_DESCRIPTOR_KEY, target, propertyName);
      console.log(prefix + 'User data descriptor: ', userDataDesc);
      if (userDataDesc !== undefined) {
        console.log(prefix + 'User data: ', args[userDataDesc.parameterIndex]);
        console.log(prefix + 'User ID: ', args[userDataDesc.parameterIndex][userDataDesc.userIdProp]);
      } else {
        throw new MissingRequiredException('Missing UserData - specify @UserData on user parameter', HttpStatus.BAD_REQUEST);
      }
      return origMethod.apply(this, args);
    };
  };
}
