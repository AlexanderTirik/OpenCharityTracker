import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BlockchainEntity } from '../blockchain/blockchain.entity';
import { JoinColumn } from 'typeorm';
import { CardEntity } from '../card/card.entity';

@Entity({ name: 'Project' })
export class ProjectEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'project_id' })
  projectId: string;

  @Column('text', { name: 'project_name', nullable: true })
  name: string;

  @Column('text', { name: 'project_description', nullable: true })
  description: string;

  @Column('uuid', { name: 'blockchain_id' })
  blockchainId: string;

  @OneToOne(() => BlockchainEntity, {
    cascade: ['update', 'remove', 'insert'],
    eager: true,
  })
  @JoinColumn({ name: 'blockchain_id' })
  blockchain: BlockchainEntity;

  @OneToMany(() => CardEntity, (card) => card.project, {
    cascade: ['update', 'remove', 'insert'],
    eager: true,
    primary: true
  })
  cards: CardEntity[];
}
