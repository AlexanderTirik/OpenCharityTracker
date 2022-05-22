import { Injectable } from '@nestjs/common';
import { ProjectByIdDTO } from './DTOs/projectByIdDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectRepository } from '../repositories/projectRepository/projectRepository';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectRepository)
    protected projectRepository: ProjectRepository,
  ) {}
  async getProject(id: string): Promise<ProjectByIdDTO> {
    const project = await this.projectRepository.getProject(id);

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
