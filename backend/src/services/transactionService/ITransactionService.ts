import { ITransaction } from './ITransaction';
import { ProjectDTO } from '../../repositories/projectRepository/dto';

export interface ITransactionService {
  addMonobankTransaction({
    transaction,
    project,
  }: {
    transaction: ITransaction;
    project: ProjectDTO;
  }): Promise<void>;
}
