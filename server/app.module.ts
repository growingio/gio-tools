import { Module } from '@nestjs/common';
import { ConfigModule } from 'nestjs-config';
import { DBModule } from './common/db.module';
import { QSModule } from './qs/qs.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config.{ts,js}')),
    DBModule,
    QSModule,
  ],
})
export class AppModule {}
