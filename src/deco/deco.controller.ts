import { Body, Controller, Get, Put, Query, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { ClassInfoTrace } from './decorators/class-info-trace';
import { Result } from './types';
import { Required, Validate } from './decorators/validate.decorator';
import { User } from '../auth/user';
import { DECISION_DATA_KEY, DECISION_ARGS_PARAMS_KEY, DecisionExpr } from '../decision/decision-expr.decorator';
import { ParamId } from './decorators/param-to-metadata.decorator';
import { DecisionGuard } from '../decision/decision.guard';
import { Decisions, Op } from '../decision/decisions';
import { CurrentUserDecision } from '../decision/current-user-decision';
import { HttpBasicAuthGuard } from '../auth/http-basic-auth-guard';
import { Deco } from './decorators/deco.decorator';
import { Deco2 } from './decorators/deco2.decorator';
import { Deco3 } from './decorators/deco3.decorator';
import { DecoMethod } from './decorators/deco-method.decorator';
import { Global1Guard } from '../grd/guards/global1.guard';

@Controller('deco')
@ClassInfoTrace
@Deco({ label: 'class DecoController' })
export class DecoController {
  text: string;

  @Get('test')
  @Deco({ label: 'test()' })
  @UseGuards(HttpBasicAuthGuard)
  test(@Req() req): string {
    console.log('test - logged in:', req.user);
    return 'ok';
  }

  @Get('test2')
  @Deco({ label: 'test2()' })
  @Deco2({ label: 'test2()' })
  @Deco3({ label: 'test2()' })
  test2(): string {
    return 'ok';
  }

  @Get('testValid')
  @Validate
  validTest(
    @Query('param1') @Required @Deco({ label: 'param1' }) param1: string,
    @Query('param2') @Required @Deco({ label: 'param2' }) param2: string,
    @Query('param2') @Deco({ label: 'param3' }) param3: string
  ): Result {
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
  @UseGuards(Global1Guard)
  @DecoMethod('updateUser')

/*  @SetMetadata('roles', ['A', 'B', 'C'])
  @DecisionExpr(new Decisions(Op.AND, [
    new CurrentUserDecision({ sourceParamId: 'user', func: (user: User) => user.id })
  ]))
  @UseGuards(DecisionGuard)
  //@UseGuards(HttpBasicAuthGuard, DecisionGuard)
  @Deco({ label: 'updateUser()' })*/
  updateUser(@ParamId('cica') cica: string, @ParamId('user') @Body() u: User, @ParamId('etc') etc): any {
    console.log('start of updateUser()');
    //const d = new CurrentUserDecision({ markId: 'user', func: (user: User) => user.id });
    console.log('end of updateUser()');
    return { hello: u.name };
  }
}
