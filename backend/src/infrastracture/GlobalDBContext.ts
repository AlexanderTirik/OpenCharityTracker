import { IGlobalDBContext } from '../common/IGlobalDBContext';
import { getConnection, QueryRunner } from 'typeorm';
import { IProjectRepository } from '../repositories/projectRepository/IProjectRepository';
import { ProjectRepository } from '../repositories/projectRepository/projectRepository';
import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class GlobalDBContext implements IGlobalDBContext {
  private _queryRunner: QueryRunner;
  private _projectRepository: IProjectRepository;

  public constructor() {
    this._queryRunner = getConnection().createQueryRunner();
    this.initRepositories();
  }

  private initRepositories() {
    this._projectRepository =
      this._queryRunner.manager.getCustomRepository(ProjectRepository);
  }

  public get projectRepository(): IProjectRepository {
    return this._projectRepository;
  }
}
