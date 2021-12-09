import { Controller, Get, UseGuards } from '@nestjs/common';
import { Test1Guard } from './guards/test1.guard';
import { Test2Guard } from './guards/test2.guard';
import { EnableGuard, Global1GuardTarget } from './decorators/enable-guard.decorator';

@Controller('grd')
export class GrdController {
  @Get('test')
  //@DecoMethod('1')
  @UseGuards(
    Test2Guard,
    Test1Guard,
  )
  @EnableGuard({ target: Global1GuardTarget.G1, enabled: true })
/*  @DecoMethod('1')
  @DecoMethod('2')
  @DecoMethod2('3')
  @DecoMethod2('4')*/
  test(): string {
    console.log('test() called');
    return 'ok';
  }
}
