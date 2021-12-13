import { Controller, Get, UseGuards } from '@nestjs/common';
import { Test1Guard } from './guards/test1.guard';
import { Test2Guard } from './guards/test2.guard';
import { EnableGuard, GuardTarget } from './decorators/enable-guard.decorator';
import { DecoMethod } from '../deco/decorators/deco-method.decorator';

@Controller('grd')
export class GrdController {
  @Get('test')
  @UseGuards(
    Test2Guard,
    Test1Guard,
  )
  @DecoMethod('test() 1')
/*  @EnableGuard({ target: GuardTarget.G1, enabled: true })
  @EnableGuard({ target: GuardTarget.T1, enabled: true })
  @DecoMethod('test() 2')
  @EnableGuard({ target: GuardTarget.T2, enabled: false })
  @DecoMethod('test() 3')*/
  test(): string {
    console.log('test() called');
    return 'ok';
  }
}
