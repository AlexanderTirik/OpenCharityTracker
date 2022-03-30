import { ITransaction } from './ITransaction';

class TransactionService {
  private transactions: ITransaction[];
  constructor() {
    this.transactions = [];
  }
  addMonobankTransaction(transaction: ITransaction): void {
    const isDuplicate = this.transactions.find(
      ({ id }) => id === transaction.id,
    );
    if (!isDuplicate) {
      this.transactions.push(transaction);
    }
  }
  getTransactions(): ITransaction[] {
    return this.transactions;
  }
}

const transactionService = new TransactionService();

export { transactionService };
