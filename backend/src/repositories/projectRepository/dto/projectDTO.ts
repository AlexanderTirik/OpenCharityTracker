import { BlockchainDTO } from './blockchainDTO';
import { CardDTO } from './cardDTO';

export interface ProjectDTO {
  id: string;
  name: string;
  description: string | null;
  blockchain: BlockchainDTO;
  cards: CardDTO[];
  collectedAmount: number;
  goal: number;
}
