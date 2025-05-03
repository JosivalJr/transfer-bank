import { INestApplication } from '@nestjs/common';

import { EnvironmentVariablesProvider } from '@core/enviroment-variables/providers/enviroment-variables.provider';

import { SwaggerConfiguration } from './swagger.config';

export class SwaggerDefinition {
  /**
   * Initialize Swagger Documentation
   * @param app Application instance
   * @param url URL that will be released for viewing this documentation
   */
  public static start(
    app: INestApplication,
    env: EnvironmentVariablesProvider,
    url: string,
  ) {
    new SwaggerConfiguration(app, env)
      .setName('Transfer Bank')
      .setDescription('Transfer Bank API')
      .start(url);
  }
}
