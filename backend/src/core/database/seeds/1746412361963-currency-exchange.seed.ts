import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { CurrencyExchangeEntity } from '@modules/currency-exchange/domain/entities/currency-exchange.entity';

export class CurrencyExchangeSeed1746412361963 implements Seeder {
  track = false;

  public async run(dataSource: DataSource): Promise<any> {
    const exchangeRepository = dataSource.getRepository(CurrencyExchangeEntity);

    const exchanges = [
      { symbol: 'USD', name: 'US Dollar' },
      { symbol: 'EUR', name: 'Euro' },
      { symbol: 'BRL', name: 'Brazillian Real' },
      { symbol: 'JPY', name: 'Japanese Yen' },
      { symbol: 'GBP', name: 'British Pound' },
      { symbol: 'AUD', name: 'Australian Dollar' },
      { symbol: 'CAD', name: 'Canadian Dollar' },
      { symbol: 'CHF', name: 'Swiss Franc' },
      { symbol: 'CNY', name: 'Chinese Yuan (Renminbi)' },
      { symbol: 'NZD', name: 'New ZealandDollar' },
      { symbol: 'SEK', name: 'Swedish Krona' },
      { symbol: 'NOK', name: 'Norwegian Krone' },
      { symbol: 'KRW', name: 'South Korean Won' },
      { symbol: 'SGD', name: 'Singapore Dollar' },
      { symbol: 'HKD', name: 'Hong Kong Dollar' },
      { symbol: 'INR', name: 'Indian Rupee' },
    ];

    for (const exchange of exchanges) {
      const exists = await exchangeRepository.findOneBy({
        symbol: exchange.symbol,
      });

      if (!exists) await exchangeRepository.save(exchange);
    }

    console.info('Currency Exchange seed executed successfully!');
  }
}
