import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // use validation pipe
  app.useGlobalPipes(new ValidationPipe({
    transform: true,  // @Params, @Query, @Body type 자동 변환
    whitelist: true,
    forbidNonWhitelisted: true, // DTO 정의되지 않는 필드 허용X
  }))
  await app.listen(3000);
}
bootstrap();
