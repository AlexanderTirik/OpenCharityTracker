import { ProjectDTO } from './dto';

export interface IProjectRepository {
  getProjectByMonobankAccountId(accountId: string): Promise<ProjectDTO>;
  getProject(id: string): Promise<ProjectDTO>;
}
