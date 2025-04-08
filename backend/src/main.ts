import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const createMethodName = (controllerKey: string, methodKey: string): string => {
    // Normalize keys: lowercase, remove special characters, and split into words
    const controllerKeyWords = controllerKey
      .replace(/[^a-zA-Z0-9]+/g, ' ')
      .replace(/controller/i, '')
      .toLowerCase()
      .split(' ');

    const methodKeyWords = methodKey
      .replace(/[^a-zA-Z0-9]+/g, ' ')
      .split(' ');

    // Filter out duplicates, ignoring case and handling plurals
    const filteredControllerKeyWords = controllerKeyWords.filter(controllerWord => {
      return !methodKeyWords.some(methodWord => {
        const controllerSingular = controllerWord.replace(/s$/, '').toLowerCase(); // Remove 's' for singular
        const methodSingular = methodWord.replace(/s$/, '').toLowerCase(); // Remove 's' for singular
        return controllerSingular === methodSingular;
      });
    });

    // Combine filtered words and convert to camel case
    const combinedWords = [...methodKeyWords, ...filteredControllerKeyWords ];

    const camelCasedMethodName = combinedWords.reduce((result, word, index) => {
      const normalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
      return index === 0 ? normalizedWord.charAt(0).toLowerCase() + normalizedWord.slice(1) : result + normalizedWord;
    }, "");


    return camelCasedMethodName;
  }

  const config = new DocumentBuilder()
    .setTitle('Shanda API')
    .setDescription('Shanda API description')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const options: SwaggerDocumentOptions = {
      operationIdFactory: (
        controllerKey: string,
        methodKey: string
      ) => createMethodName(controllerKey, methodKey)
    };
  const documentFactory = () => SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(4201); // get from env..
}
bootstrap();
