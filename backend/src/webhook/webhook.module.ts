import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { GlobalDBContext } from '../infrastracture/GlobalDBContext';
import { Base, Services } from '../common/constants';
import { TransactionService } from '../services/transactionService/transaction.service';

@Module({
  imports: [],
  controllers: [WebhookController],
  providers: [
    WebhookService,
    {
      provide: Base.GLOBAL_DB_CONTEXT,
      useClass: GlobalDBContext,
    },
    {
      provide: Services.TRANSACTION,
      useClass: TransactionService,
    },
  ],
})
export class WebhookModule {}
