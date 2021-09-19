import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  const PORT = Number(process.env) || 5000

  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
start();
