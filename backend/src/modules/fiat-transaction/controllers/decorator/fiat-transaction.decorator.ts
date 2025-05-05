import { ControllerDecorator } from '@core/base/decorators/route.decorator';

class Controller extends ControllerDecorator {
  public constructor() {
    super('fiat-transactions', 'Fiat Transactions');
  }

  public default() {
    return this.applyProperties(this.login());
  }
}

export const FiatTransactionController = new Controller();
