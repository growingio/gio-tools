import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from 'nestjs-config';
import { LoginMiddleware } from './middleware/login.middleware';
import { CookieParserMiddleware } from '@nest-middlewares/cookie-parser';
import { DBModule } from './common/db.module';
import { QSModule } from './qs/qs.module';
import { UserModule } from './user/user.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, '../.gio/config.{ts,js}')),
    DBModule,
    QSModule,
    UserModule,
  ],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CookieParserMiddleware, LoginMiddleware)
      .forRoutes('*');
  }
}
