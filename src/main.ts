import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ 
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  app.enableCors({
    origin: [
      'http://localhost:3000',                // frontend lokal
      'https://manutics.netlify.app'      // frontend di Netlify
    ],
    
    credentials: true, // jika menggunakan cookies, set ini ke true
  });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
