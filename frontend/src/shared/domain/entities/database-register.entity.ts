import { EStatus } from '../enums';
import { ID } from '../types';

export class DatabaseRegister {
  id: ID = 0;

  status?: EStatus;

  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  constructor(data: Partial<DatabaseRegister>) {
    Object.assign(this, data);
  }
}
