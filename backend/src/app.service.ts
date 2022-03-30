import { Injectable, Inject } from '@nestjs/common';
import { transactionService } from './services/transaction-service';
import { ITransaction } from './services/ITransaction';

@Injectable()
export class AppService {
  getTransactions(): ITransaction[] {
    return transactionService.getTransactions();
  }
}
