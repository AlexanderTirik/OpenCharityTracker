import {
  CardProviders,
  MonobankSpecificData,
} from '../../../entities/card/interfaces';

export interface CardDTO {
  id: string;
  number: string;
  provider: CardProviders;
  issuerSpecificData: MonobankSpecificData;
}
