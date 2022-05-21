import { blockchainService } from '../blockchain-service';
import { ITransaction } from './ITransaction';
import { Injectable } from '@nestjs/common';
import { ITransactionService } from './ITransactionService';
import { ProjectDTO } from '../../repositories/projectRepository/dto';
import { fromJsonToKeypair } from '../../helpers/blockchain-helper';
import { Events } from '../../common/constants';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ITransactionFinalizedEvent } from '../../interfaces/events';

@Injectable()
export class TransactionService implements ITransactionService {
  constructor(private eventEmitter: EventEmitter2) {}
  async addMonobankTransaction({
    transaction,
    project,
  }: {
    transaction: ITransaction;
    project: ProjectDTO;
  }): Promise<void> {
    try {
      const transactionSignature =
        await blockchainService.sendTransactionToBlockchain(
          fromJsonToKeypair(project.blockchain.key),
          transaction.amount,
        );

      console.log(transactionSignature);
      const eventData: ITransactionFinalizedEvent = {
        projectId: project.id,
        id: transaction.id,
        transactionSignature,
      };

      this.eventEmitter.emit(Events.TRANSACTION_FINALIZED, eventData);
    } catch (e) {
      console.error(e);
    }
  }
}
