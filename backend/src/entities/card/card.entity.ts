import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CardProviders, MonobankSpecificData } from './interfaces';
import { ProjectEntity } from '../project/project.entity';

@Entity({ name: 'Card' })
export class CardEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'card_entity_id' })
  cardEntityId: string;

  @Column('json', { name: 'issuer_specific_data' })
  issuerSpecificData: MonobankSpecificData;

  @Column('varchar', { name: 'card_number' })
  cardNumber: string;

  @Column('varchar', { name: 'card_provider' })
  cardProvider: CardProviders;

  @Column('uuid', { name: 'project_id' })
  projectId: string;

  @ManyToOne(() => ProjectEntity, (project) => project.cards, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project: ProjectEntity;
}
