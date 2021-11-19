import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { DECO_PREFIX } from './deco-constants';

export const RequestParamDeco = createParamDecorator((data: string, ctx: ExecutionContext) => {
  console.log(DECO_PREFIX + 'ParamDeco1: called', data);
  const request = ctx.switchToHttp().getRequest();
  return request.params[data];
});
