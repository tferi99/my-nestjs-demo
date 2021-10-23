import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DecoModule } from './deco/deco.module';

@Module({
  imports: [DecoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
