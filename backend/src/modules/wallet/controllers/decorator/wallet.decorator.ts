import { ControllerDecorator } from '@core/base/decorators/route.decorator';

class Controller extends ControllerDecorator {
  public constructor() {
    super('wallet', 'Wallet');
  }

  public default() {
    return this.applyProperties(this.login());
  }
}

export const WalletController = new Controller();
