import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DecoModule } from './deco/deco.module';
import { GrdModule } from './grd/grd.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DecoModule, GrdModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
