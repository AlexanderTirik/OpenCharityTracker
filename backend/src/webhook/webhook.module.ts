import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { Services } from '../common/constants';
import { TransactionService } from '../services/transactionService/transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectRepository } from '../repositories/projectRepository/projectRepository';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectRepository])],
  controllers: [WebhookController],
  providers: [
    WebhookService,
    {
      provide: Services.TRANSACTION,
      useClass: TransactionService,
    },
  ],
})
export class WebhookModule {}
