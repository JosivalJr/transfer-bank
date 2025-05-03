import helmet from 'helmet';

import { INestApplication } from '@nestjs/common';

export class SecurityConfig {
  /**
   * Initializing the security configuration for accessing the API via HTTP
   * @param app Application instance
   */
  public static start(app: INestApplication) {
    app.enableCors({ credentials: true, origin: true });
    app.use(helmet());
  }
}
