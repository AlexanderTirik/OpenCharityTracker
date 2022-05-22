import { BlockchainDTO } from '../dto';
import { CardEntity } from '../../../entities/card/card.entity';
import { BlockchainEntity } from '../../../entities/blockchain/blockchain.entity';

export class BlockchainMapper {
  public static toDTO(blockchainEntity: BlockchainEntity): BlockchainDTO {
    return {
      description: blockchainEntity.description || null,
      key: blockchainEntity.key,
    };
  }

  public static toEntity(_blockchainDTO: BlockchainDTO): CardEntity {
    throw new Error('To be implemented');
  }
}
