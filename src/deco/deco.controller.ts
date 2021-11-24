import { Body, Controller, Get, Post, Put, Query, UseGuards, UsePipes } from '@nestjs/common';
import { ClassInfoTrace } from './decorators/class-info-trace';
import { Result } from './types';
import { Required, Validate } from './decorators/validate.decorator';
import { DumpDecoratorParams } from './decorators/dump-params.decorator';
import { User } from '../model/user';
import { DecisionExpr } from '../decision/auth-decision.decorator';
import { ParamId } from './decorators/param-to-metadata.decorator';
import { DecisionGuard } from '../decision/decision.guard';
import { Decisions, Op } from '../decision/decisions';
import { CurrentUserDecision } from '../decision/current-user-decision';

@Controller('deco')
@ClassInfoTrace
@DumpDecoratorParams('DecoController class')
export class DecoController {
  text: string;

  @UsePipes()
  @Get('test2')
  @DumpDecoratorParams('test2 method')
  test2(): string {
    return 'ok';
  }

  @Get('testValid')
  @Validate
  validTest(@Query('param1') @Required @DumpDecoratorParams('param1') param1: string, @Query('param2') @Required @DumpDecoratorParams('param2') param2: string): Result {
    return { message: 'ok' };
  }

  /**
   * Only current user OR root can update user.
   *
   * @param cica
   * @param u
   * @param etc
   */
  @Put('user')
  @DecisionExpr(new Decisions(Op.AND, [
    new CurrentUserDecision({ sourceParamId: 'user', func: (user: User) => user.id })
  ]))
  @UseGuards(DecisionGuard)
  @DumpDecoratorParams('checkUser2 method')
  updateUser(@ParamId('cica') cica: string, @ParamId('user') @Body() u: User, @ParamId('etc') etc): any {
    //const d = new CurrentUserDecision({ markId: 'user', func: (user: User) => user.id });
    return { hello: u.name };
  }
}
