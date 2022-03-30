import { Inject, Injectable } from '@nestjs/common';
import { IMonoBankTransaction } from '../services/IMonoBankTransaction';
import { config } from '../config';
import { transactionService } from '../services/transaction-service';

@Injectable()
export class WebhookService {
  processMonobankTransaction(transaction: IMonoBankTransaction): void {
    const isAccountTrackable = transaction.data.account === config.accountId;
    const isRefillTransaction = transaction.data.statementItem.amount > 0;
    if (isAccountTrackable && isRefillTransaction) {
      const item = transaction.data.statementItem;
      transactionService.addMonobankTransaction({
        id: item.id,
        time: item.time,
        description: item.description,
        amount: item.amount,
        comment: item.comment || '',
      });
    }
  }
}
