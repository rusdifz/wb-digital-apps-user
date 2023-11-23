import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';

import { AppModule } from './app.module';
import { ResponseErrorGlobal } from './utils/middleware/interceptor/response/error'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ResponseErrorGlobal());
  app.enableCors()  

  const config = new DocumentBuilder()
    .setTitle('WB Digital')
    .setDescription('User Profile API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  writeFileSync(
    './api-user-profile.swagger-spec.json',
    JSON.stringify(document, null, 2),
  );

  await app.listen(3000);
}
bootstrap();
