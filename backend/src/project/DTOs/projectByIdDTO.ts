import { CardProviders } from '../../entities/card/interfaces';

export interface ProjectByIdDTO {
  id: string;
  name: string;
  description: string;
  amount: number;
  goal: number;
  cards: Array<{
    provider: CardProviders;
    number: string;
  }>;
}
