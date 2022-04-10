import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Blockchain' })
export class BlockchainEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'blockchain_id' })
  blockchainId: string;

  @Column('json', { name: 'blockchain_key' })
  key: object;

  @Column('text', { name: 'blockchain_description', nullable: true })
  description: number;
}
