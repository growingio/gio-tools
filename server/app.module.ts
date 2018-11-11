import { Module } from '@nestjs/common';
import { ConfigModule } from 'nestjs-config';
import { QSModule } from './qs/qs.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config.ts')),
    QSModule,
  ],
})
export class AppModule {}
