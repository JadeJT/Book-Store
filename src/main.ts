import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express'
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
    methods: 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  });
  app.useGlobalPipes(new ValidationPipe());
  // Swagger
  const options = new DocumentBuilder()
    .setTitle('Title: Book Store')
    .setDescription('Description : api-book-store')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(3000);
}
bootstrap();
