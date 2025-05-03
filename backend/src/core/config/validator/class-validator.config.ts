import { INestApplication } from '@nestjs/common';
import { ValidatorPipe } from './validator-pipe.config';

export class ClassValidator {
  /**
   * Initialization of the ClassValidator library responsible for creating the Dtos validation
   * @param app Application instance
   */
  public static start(app: INestApplication): void {
    app.useGlobalPipes(new ValidatorPipe());
  }
}
