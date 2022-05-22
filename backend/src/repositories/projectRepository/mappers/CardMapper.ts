import { CardDTO } from '../dto';
import { CardEntity } from '../../../entities/card/card.entity';

export class CardMapper {
  public static toDTO(cardEntity: CardEntity): CardDTO {
    return {
      id: cardEntity.cardEntityId,
      issuerSpecificData: cardEntity.issuerSpecificData,
      provider: cardEntity.cardProvider,
      number: cardEntity.cardNumber,
    };
  }

  public static toEntity(_cardDTO: CardDTO): CardEntity {
    throw new Error('To be implemented');
  }
}
