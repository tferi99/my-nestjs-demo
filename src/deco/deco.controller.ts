import { Controller, Get } from '@nestjs/common';
import { ClassDeco1 } from './decorators/class-deco1.decorator';
import { ParamDeco1 } from './decorators/param-deco1.decorator';
import { DuplicatePipe } from '../pipes/duplicate.pipe';
import { Color, Colors } from './decorators/meta-deco1.decorator';

@Controller('deco')
export class DecoController {
  text: string;

  @Get(':val')
  @ClassDeco1()
  @Colors(Color.BLACK, Color.RED)
  test(@ParamDeco1('val', DuplicatePipe) str: string): string {
    return str;
  }
}
