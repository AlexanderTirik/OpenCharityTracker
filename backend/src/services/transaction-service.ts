import { fromJsonToKeypair } from 'src/helpers/blockchain-helper';
import { getLocalJSON } from 'src/helpers/file-helper';
import { blockchainService } from './blockchain-service';
import { ITransaction } from './ITransaction';

class TransactionService {
  private transactions: ITransaction[];
  constructor() {
    this.transactions = [];
  }
  async addMonobankTransaction(transaction: ITransaction): void {
    const isDuplicate = this.transactions.find(
      ({ id }) => id === transaction.id,
    );
    if (!isDuplicate) {
      this.transactions.push(transaction);
      await blockchainService.sendTransactionToBlockchain(
        // need change to project account
        fromJsonToKeypair(getLocalJSON('account')),
        transaction.amount,
      );
    }
  }
  getTransactions(): ITransaction[] {
    return this.transactions;
  }
}

const transactionService = new TransactionService();

export { transactionService };
