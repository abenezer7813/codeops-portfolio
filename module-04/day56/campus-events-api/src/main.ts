import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

   app.setGlobalPrefix('api')
const config = new DocumentBuilder()
  .setTitle("Campus Event API")
  .setDescription(
    "Campus events api")
  .setVersion("1.0")
  .addTag("events", "All campus events")
  .addApiKey({ type: "apiKey", name: "x-api-key", in: "header" })
  .build();
 
const document = SwaggerModule.createDocument(app, config,{ignoreGlobalPrefix: false,});
SwaggerModule.setup("api/docs", app, document, {
  swaggerOptions: { persistAuthorization: true },
});

   app.useGlobalPipes(new ValidationPipe({whitelist:true}))
   app.enableCors({origin:'http://localhost:3000'})

  await app.listen(process.env.PORT ?? 4000);
 
}
await bootstrap();
