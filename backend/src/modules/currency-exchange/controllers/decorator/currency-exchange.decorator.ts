import { ControllerDecorator } from '@core/base/decorators/route.decorator';

class Controller extends ControllerDecorator {
  public constructor() {
    super('currency-exchange', 'Currency Exchange');
  }

  public default() {
    return this.applyProperties(this.login());
  }
}

export const CurrencyExchangeController = new Controller();
