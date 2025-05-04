import { DataSource } from 'typeorm';
import { runSeeders, Seeder } from 'typeorm-extension';
import { UserSeed1746311075379 } from './1746311075379-user.seed';

export class InitSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    await runSeeders(dataSource, {
      seeds: [UserSeed1746311075379],
    });

    console.info('Seeds successfully executed!');
  }
}
