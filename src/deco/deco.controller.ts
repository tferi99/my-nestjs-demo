import { Controller, Get, Query, UseGuards, UsePipes } from '@nestjs/common';
import { ClassInfoTrace } from './decorators/class-info-trace';
import { Result } from './types';
import { Required, Validate } from './decorators/validate.decorator';
import { DumpDecoratorParams } from './decorators/dump-params.decorator';

@Controller('deco')
@ClassInfoTrace
@DumpDecoratorParams
export class DecoController {
  text: string;

  @UsePipes()
  @Get('test2')
  @DumpDecoratorParams
  test2(): string {
    return 'ok';
  }

  @Get('testValid')
  @Validate
  validTest(@Query('param1') @Required @DumpDecoratorParams param1: string, @Query('param2') @Required @DumpDecoratorParams param2: string): Result {
    return { message: 'ok' };
  }

  @UseGuards()
  test(): void {
    const a = 1;
  }
}
