import { User } from '../../model/user';
import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';

export const USER_DATA_DESCRIPTOR_KEY = 'userDataParamIndex';

export function UserData(userIdProp: string): any {
  return function(target: any, propertyKey: string | symbol, parameterIndex: number) {
    const userDataDesc: UserDataDescriptor = { parameterIndex, userIdProp };
    Reflect.defineMetadata(USER_DATA_DESCRIPTOR_KEY, userDataDesc, target, propertyKey);
  };
}

export interface UserDataDescriptor {
  parameterIndex: number;
  userIdProp: string;
}
