import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomValidationPipe } from './utils/custom.validation-pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:4000', 'http://172.16.5.33:4000'],
    credentials: true,
  });

  app.useGlobalPipes(new CustomValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
