import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { DECO_PREFIX } from './prefix';

export const ParamDeco1 = createParamDecorator((data: string, ctx: ExecutionContext) => {
  console.log(DECO_PREFIX + 'ParamDeco1: called', data);
  const request = ctx.switchToHttp().getRequest();
  return request.params[data];
});
