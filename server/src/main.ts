import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 3000);
}

bootstrap();
