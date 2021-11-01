import { Controller, Get, UseGuards } from '@nestjs/common';
import { Test1Guard } from './guards/test1.guard';
import { Test2Guard } from './guards/test2.guard';
import { Global2GuardKill } from './decorators/global2-guard-kill';

@Controller('grd')
export class GrdController {
  @Get('test')
  @UseGuards(
    Test2Guard,
    Test1Guard,
  )
  @Global2GuardKill(false)
  test(): string {
    return 'ok';
  }
}
