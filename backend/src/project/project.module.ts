import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Base } from '../common/constants';
import { GlobalDBContext } from '../infrastracture/GlobalDBContext';

@Module({
  controllers: [ProjectController],
  providers: [
    ProjectService,
    {
      provide: Base.GLOBAL_DB_CONTEXT,
      useClass: GlobalDBContext,
    },
  ],
})
export class ProjectModule {}
