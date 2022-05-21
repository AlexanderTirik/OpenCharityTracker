import { Inject, Injectable } from '@nestjs/common';
import { Base } from '../common/constants';
import { IGlobalDBContext } from '../common/IGlobalDBContext';
import { ProjectByIdDTO } from './DTOs/projectByIdDTO';

@Injectable()
export class ProjectService {
  constructor(
    @Inject(Base.GLOBAL_DB_CONTEXT)
    protected _dbContext: IGlobalDBContext,
  ) {}
  async getProject(id: string): Promise<ProjectByIdDTO> {
    const project = await this._dbContext.projectRepository.getProject(id);

    return {
      id: project.id,
      name: project.name,
      description: project.description,
      cards: project.cards.map(({ provider, number }) => ({
        provider,
        number,
      })),
      amount: project.collectedAmount,
      goal: project.goal,
    };
  }
}
