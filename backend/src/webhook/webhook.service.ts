import { Inject, Injectable } from '@nestjs/common';
import { IMonoBankTransaction } from '../services/transactionService/IMonoBankTransaction';
import { config } from '../config';
import { Events, Services } from '../common/constants';
import { ITransactionService } from '../services/transactionService/ITransactionService';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ITransactionInitiatedEvent } from '../interfaces/events';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectRepository } from '../repositories/projectRepository/projectRepository';

@Injectable()
export class WebhookService {
  constructor(
    @InjectRepository(ProjectRepository)
    private projectRepository: ProjectRepository,
    @Inject(Services.TRANSACTION)
    protected _transactionService: ITransactionService,
    private eventEmitter: EventEmitter2,
  ) {}
  async processMonobankTransaction(
    transaction: IMonoBankTransaction,
  ): Promise<void> {
    const isAccountTrackable = transaction.data.account === config.accountId;
    const isRefillTransaction = transaction.data.statementItem.amount > 0;
    if (isAccountTrackable && isRefillTransaction) {
      const relatedProject =
        await this.projectRepository.getProjectByMonobankAccountId(
          transaction.data.account,
        );
      if (!relatedProject) {
        console.log('missed transaction', JSON.stringify(transaction));
        return;
      }

      const item = transaction.data.statementItem;
      const transactionData = {
        id: item.id,
        time: item.time,
        description: item.description,
        amount: item.amount,
        comment: item.comment || '',
      };

      const transactionInitiatedEvent: ITransactionInitiatedEvent = {
        amount: transactionData.amount,
        projectId: relatedProject.id,
        id: transactionData.id,
      };
      this.eventEmitter.emit(
        Events.TRANSACTION_INITIATED,
        transactionInitiatedEvent,
      );

      this._transactionService.addMonobankTransaction({
        transaction: transactionData,
        project: relatedProject,
      });
    }
  }
}
