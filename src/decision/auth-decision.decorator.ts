import { ParamIndexes, PARAMS_IDS_KEY } from '../deco/decorators/param-to-metadata.decorator';
import { Decision } from './decision-types';

export const DECISION_DATA_KEY = 'DecisionData';
export const DECISION_METHOD_PARAMS_KEY = 'DecisionMethodParams';

export function DecisionExpr(data: Decision) {
  const prefix = '    # DecisionExpr: ';

  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    console.log('@DecisionExpr - factory data ', data);
    console.log(prefix + 'Target:', target);
    console.log(prefix + 'Property:', propertyName);
    console.log(prefix + 'Descriptor:', descriptor);

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
      console.log(prefix + 'Parameters of method ' + propertyName + '():', args);

/*      const userDataDesc: UserDataDescriptor = Reflect.getOwnMetadata(USER_DATA_DESCRIPTOR_KEY, target, propertyName);
      console.log(prefix + 'User data descriptor: ', userDataDesc);
      if (userDataDesc !== undefined) {
        console.log(prefix + 'User data: ', args[userDataDesc.parameterIndex]);
        console.log(prefix + 'User ID: ', args[userDataDesc.parameterIndex][userDataDesc.userIdProp]);
      } else {
        throw new MissingRequiredException('Missing UserData - specify @UserData on user parameter', HttpStatus.BAD_REQUEST);
      }*/

      Reflect.defineMetadata(DECISION_DATA_KEY, data, target, propertyName);
      Reflect.defineMetadata(DECISION_METHOD_PARAMS_KEY, args, target, propertyName);

      // calling original method
      return origMethod.apply(this, args);
    };
  };
}
