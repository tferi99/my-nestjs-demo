import { HttpStatus } from '@nestjs/common';
import { MissingRequiredException } from '../deco/exception/exceptions';
import { PARAMS_IDS_KEY, ParamIndexes } from '../deco/decorators/param-to-metadata.decorator';
import { Decision } from './decision-types';
import { USER_DATA_DESCRIPTOR_KEY, UserDataDescriptor } from '../../dist/deco/decorators/user-data.decorator';

export function DecisionExpr(data: Decision) {
  const prefix = '    # AuthDecision: ';

  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    console.log('@AuthDecision - factory data ', data);
    const origMethod = descriptor.value!;

    if (descriptor.get) {
      const val = descriptor.get();
      console.log('Descriptor:', val);
    }

    // checking marked parameters
    const markedParams: ParamIndexes = Reflect.getOwnMetadata(PARAMS_IDS_KEY, target, propertyName);
    console.log(prefix + 'Marked mathod parameters: ', markedParams);

    // If you change descriptor.value then you replace
    // the original function.
    // If you save the original value you can call it here or later.
    // This way you can inject a new behavior before/after the original function.
    descriptor.value = function (...args) {
      console.log(prefix + 'Method parameters of injected method: ', args);

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
