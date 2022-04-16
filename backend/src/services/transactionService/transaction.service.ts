import { blockchainService } from '../blockchain-service';
import { ITransaction } from './ITransaction';
import { Injectable } from '@nestjs/common';
import { ITransactionService } from './ITransactionService';
import { ProjectDTO } from '../../repositories/projectRepository/dto';
import { fromJsonToKeypair } from '../../helpers/blockchain-helper';

@Injectable()
export class TransactionService implements ITransactionService {
  async addMonobankTransaction({
    transaction,
    project,
  }: {
    transaction: ITransaction;
    project: ProjectDTO;
  }): Promise<void> {
    try {
      // TODO: write to AWS S3
      await blockchainService.sendTransactionToBlockchain(
        fromJsonToKeypair(project.blockchain.key),
        transaction.amount,
      );
    } catch (e) {
      console.error(e);
    }
  }
}
