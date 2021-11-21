import { Body, Controller, Get, Post, Query, Req, UsePipes } from '@nestjs/common';
import { ClassInfoTrace } from './decorators/class-info-trace';
import { Result } from './types';
import { Required, Validate } from './decorators/validate.decorator';
import { DumpDecoratorParams } from './decorators/dump-params.decorator';
import { UserData } from './decorators/user-data.decorator';
import { User } from '../model/user';
import { CurrentUserDecision, Decision, Decisions, DecisionType, Op } from '../decision/decision-types';
import { AuthDecision } from './decorators/auth-decision.decorator';
import { MarkedParam } from './decorators/param-to-metadata.decorator';

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

  @Post('checkUser')
  @AuthDecision(new Decisions(Op.AND, [new Decision(DecisionType.CurrentUser)]))
  checkUser(cica: string, @UserData('id') @Body() u: User): any {
    return { hello: u.name };
  }

  @Post('checkUser2')
  @AuthDecision(new Decisions(Op.AND, [
    new CurrentUserDecision({ markId: 'user', func: (user: User) => user.id })
  ]))
  checkUser2(@MarkedParam('cica') cica: string, @MarkedParam('user') @Body() u: User, @MarkedParam('etc') etc): any {
    const d = new CurrentUserDecision({ markId: 'user', func: (user: User) => user.id });
    return { hello: u.name };
  }
}
