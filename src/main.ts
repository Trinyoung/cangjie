import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  console.log(process.env.DATABASE_USER, '数据库用户=======>')
  const app = await NestFactory.create(AppModule);
  console.log('哈哈哈');
  app.use(cookieParser());
  await app.listen(9222);
}
bootstrap();
