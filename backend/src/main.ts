import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita a validação globalmente
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove campos que não estão no Dto.
    forbidNonWhitelisted: true, // Dá erro caso mande campos extras.
  }));

  // Habilita CORS para frontend fazer as requisições.
  app.enableCors({
    origin: 'http://localhost:5173', // Endereço do React
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
