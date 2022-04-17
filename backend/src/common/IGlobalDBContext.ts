import { IProjectRepository } from '../repositories/projectRepository/IProjectRepository';

export interface IGlobalDBContext {
  projectRepository: IProjectRepository;
}
