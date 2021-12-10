import { Controller, Get, UseGuards } from '@nestjs/common';
import { Test1Guard } from './guards/test1.guard';
import { Test2Guard } from './guards/test2.guard';
import { EnableGuard, GuardTarget } from './decorators/enable-guard.decorator';

@Controller('grd')
export class GrdController {
  @Get('test')
  @UseGuards(
    Test2Guard,
    Test1Guard,
  )
  @EnableGuard({ target: GuardTarget.G1, enabled: true })
  @EnableGuard({ target: GuardTarget.T1, enabled: true })
  @EnableGuard({ target: GuardTarget.T2, enabled: true })
  test(): string {
    console.log('test() called');
    return 'ok';
  }
}
