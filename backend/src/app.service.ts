import { Injectable } from '@nestjs/common';
// import { transactionService } from './services/transactionService/transaction.service';
import { ITransaction } from './services/transactionService/ITransaction';
import { blockchainService } from './services/blockchain-service';
import { fromJsonToKeypair } from './helpers/blockchain-helper';
import { getLocalJSON } from './helpers/file-helper';

@Injectable()
export class AppService {
  // getTransactions(): ITransaction[] {
  //   return transactionService.getTransactions();
  // }
  createAccount(): Promise<string> {
    return blockchainService.createAccount();
  }
  sendTransactionToBlockchain(): Promise<void> {
    return blockchainService.sendTransactionToBlockchain(
      fromJsonToKeypair(getLocalJSON('account')),
      5,
    );
  }
}
