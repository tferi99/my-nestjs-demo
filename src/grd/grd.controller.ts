import { Controller, Get, UseGuards } from '@nestjs/common';
import { Test1Guard } from './guards/test1.guard';
import { Test2Guard } from './guards/test2.guard';
import { EnableGuard } from './decorators/enable-guard.decorator';
import { DecoMethod } from '../deco/decorators/deco-method.decorator';

@Controller('grd')
export class GrdController {
  @Get('test')
  @UseGuards(
    Test2Guard,
    Test1Guard,
  )
  @EnableGuard(true)
//  @DecoMethod('test')
  test(): string {
    console.log('test() called');
    return 'ok';
  }
}
