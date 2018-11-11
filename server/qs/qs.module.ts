import { Module } from '@nestjs/common';
import { QSController } from './qs.controller';
import { QSService } from './qs.service';

@Module({
  imports: [
  ],
  controllers: [QSController],
  providers: [QSService],
})
export class QSModule {}
