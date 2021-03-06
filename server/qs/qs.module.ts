import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QSController } from './qs.controller';
import { QSService } from './qs.service';
import { Auth } from './entity/auth.entity';
import { QSTesterService } from './qsTester.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
  ],
  controllers: [QSController],
  providers: [QSService, QSTesterService],
})
export class QSModule {}
