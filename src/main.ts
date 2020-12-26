import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // use validation pipe
  app.useGlobalPipes(new ValidationPipe({
    transform: true,  // @Params, @Query, @Body type 자동 변환
    whitelist: true, // DTO 데코레이터 필드만 허용시킴
    forbidNonWhitelisted: true, // DTO 정의되지 않는 필드 보낼시 에러 처리
  }))
  await app.listen(3000);
}
bootstrap();
