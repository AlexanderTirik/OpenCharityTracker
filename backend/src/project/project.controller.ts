import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(
    @Inject(ProjectService)
    private readonly projectService: ProjectService,
  ) {}
  @Get(':id')
  getProject(@Param('id') projectId: string) {
    return this.projectService.getProject(projectId);
  }
}
