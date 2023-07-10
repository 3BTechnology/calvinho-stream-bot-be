import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './modules/prisma/prisma.service';
import * as cookieParse from 'cookie-parser';
import { port } from './common/config/vars';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      allowedHeaders: ['content-type'],
      origin: true,
      credentials: true,
    },
  });
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  app.use(cookieParse());
  await app.listen(port);
}
bootstrap();
