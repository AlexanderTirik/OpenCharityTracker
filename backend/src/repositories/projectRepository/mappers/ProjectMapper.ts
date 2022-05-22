import { ProjectEntity } from '../../../entities/project/project.entity';
import { ProjectDTO } from '../dto';
import { CardMapper } from './CardMapper';
import { BlockchainMapper } from './BlockchainMapper';

export class ProjectMapper {
  public static toDTO(project: ProjectEntity): ProjectDTO {
    return {
      id: project.projectId,
      name: project.name,
      description: project.description,
      goal: Number(project.goal),
      collectedAmount: Number(project.collectedAmount),
      cards: project.cards.map(CardMapper.toDTO),
      blockchain: BlockchainMapper.toDTO(project.blockchain),
    };
  }

  public static toEntity(_project: ProjectDTO): ProjectEntity {
    throw new Error('To be implemented');
  }
}
