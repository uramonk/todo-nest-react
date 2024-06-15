import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as path from 'path';

import { AppModule } from '../app.module';

async function bootstrap(): Promise<void> {
  const httpsOptions = {
    key: fs.readFileSync('./localhost-key.pem'),
    cert: fs.readFileSync('./localhost.pem'),
  };
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  const documentBuilder = new DocumentBuilder()
    .setTitle('ドキュメント')
    .setDescription('APIのドキュメント')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('api', app, document);
  const yamlDocument = yaml.dump(document, {
    skipInvalid: true,
    noRefs: true,
  });

  if (!fs.existsSync(path.join(__dirname, 'generated'))) {
    fs.mkdirSync(path.join(__dirname, 'generated'));
  }
  const yamlPath = path.join(__dirname, 'generated', 'openapi.yml');

  await fs.writeFileSync(yamlPath, yamlDocument);
}
bootstrap();
