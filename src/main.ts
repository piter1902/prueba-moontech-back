import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LogLevel, ValidationPipe } from '@nestjs/common';

// All loglevels
const allLogLevels: LogLevel[] = [
  'log',
  'error',
  'warn',
  'debug',
  'verbose',
  'fatal',
];

async function bootstrap() {
  // Get logger levels from environment variables
  const loggerLevels =
    process.env.LOG_LEVEL?.split(';')
      .filter((f) => allLogLevels.includes(f as LogLevel))
      .map((f) => f as LogLevel) ?? allLogLevels;

  const app = await NestFactory.create(AppModule, {
    logger: loggerLevels,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
