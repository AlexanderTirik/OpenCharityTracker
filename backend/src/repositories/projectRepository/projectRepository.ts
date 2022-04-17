import { AbstractRepository, EntityRepository } from 'typeorm';
import { ProjectEntity } from '../../entities/project/project.entity';
import { ProjectDTO } from './dto';
import { ProjectMapper } from './mappers/ProjectMapper';
import { CardEntity } from '../../entities/card/card.entity';
import { IProjectRepository } from './IProjectRepository';

@EntityRepository(ProjectEntity)
export class ProjectRepository
  extends AbstractRepository<ProjectEntity>
  implements IProjectRepository
{
  public async getProjectByMonobankAccountId(
    accountId: string,
  ): Promise<ProjectDTO> {
    const project = await this.createQueryBuilder('project')
      .select(['project.project_id'])
      .innerJoin(
        CardEntity,
        'card',
        `card.issuer_specific_data ->> 'accountId' = :accountId`,
        {
          accountId,
        },
      )
      .getRawOne();

    const projectEntity = await this.repository.findOne({
      projectId: project.project_id,
    });

    return ProjectMapper.toDTO(projectEntity);
  }

  public async getProject(id: string): Promise<ProjectDTO> {
    const project = await this.repository.findOne({
      projectId: id,
    });

    return ProjectMapper.toDTO(project);
  }
}
