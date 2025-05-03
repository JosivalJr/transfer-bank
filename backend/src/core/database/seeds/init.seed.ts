import { DataSource } from 'typeorm';
import { runSeeders, Seeder } from 'typeorm-extension';

export class InitSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    await runSeeders(dataSource, {
      seeds: [],
    });

    console.log('Seeds successfully executed!');
  }
}
