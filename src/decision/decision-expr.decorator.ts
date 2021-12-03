import { ParamIndexes, PARAMS_IDS_KEY } from '../deco/decorators/param-to-metadata.decorator';
import { Decision } from './decision-types';
import { SetMetadata } from '@nestjs/common';

export const DECISION_DATA_KEY = 'DecisionData';
export const DECISION_ARGS_PARAMS_KEY = 'DecisionArgsParams';

export const DecisionExpr = (data: Decision): MethodDecorator => {
/*  console.log('@DecisionExpr - factory data ', data);
  const prefix = '    # DecisionExpr: ';*/

  const factory = (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
/*    console.log('@DecisionExpr call:', data);
    console.log(prefix + 'Target:', target);
    console.log(prefix + 'Property:', propertyName);
    console.log(prefix + 'Descriptor:', descriptor);*/

    const markedParams: ParamIndexes = Reflect.getOwnMetadata(PARAMS_IDS_KEY, target, propertyName);
    console.log('Marked mathod parameters: ', markedParams);


    //Reflect.defineMetadata(DECISION_DATA_KEY, data, target, propertyName);
    //console.log(`setting metadata[${DECISION_DATA_KEY}]:`, data);
    Reflect.defineMetadata(DECISION_DATA_KEY, data, descriptor.value);
    Reflect.defineMetadata(PARAMS_IDS_KEY, markedParams, descriptor.value);
    //SetMetadata<string, Decision>(DECISION_DATA_KEY, data);
    //return descriptor;
  };
  return factory;
}



/*

    // checking marked parameters
    const markedParams: ParamIndexes = Reflect.getOwnMetadata(PARAMS_IDS_KEY, target, propertyName);
    console.log(prefix + 'Marked mathod parameters: ', markedParams);

// If you change descriptor.value then you replace
// the original function.
// If you save the original value you can call it here or later.
// This way you can inject a new behavior before/after the original function.
    descriptor.value = function (...args) {
      console.log(prefix + 'Parameters of method ' + propertyName + '():', args);


      SetMetadata(DECISION_ARGS_PARAMS_KEY, args);
      Reflect.defineMetadata(DECISION_DATA_KEY, data, target, propertyName);
      Reflect.defineMetadata(DECISION_METHOD_PARAMS_KEY, args, target, propertyName);

      // calling original method
      console.log(`${propertyName}(): Calling original method`);
      return descriptor;

 */
