import { Module } from '@nestjs/common';
import { DecoService } from './deco.service';
import { DecoController } from './deco.controller';

@Module({
  providers: [DecoService],
  controllers: [DecoController]
})
export class DecoModule {}
