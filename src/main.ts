import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(process.env.DATABASE_USER, '数据库用户=======>')
  const app = await NestFactory.create(AppModule);
  await app.listen(9222);
}
bootstrap();
