import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasOne,
} from 'sequelize-typescript';
import { bid } from './bid';

export interface bidRevisionAttributes {
  id?: string;
  amount: string;
  details: string;
  created: Date;
}

@Table({ tableName: 'bidRevision', timestamps: false })
export class bidRevision
  extends Model<bidRevisionAttributes, bidRevisionAttributes>
  implements bidRevisionAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'bidRevision_pkey', using: 'btree', unique: true })
  id?: string;

  @Column({ type: DataType.UUID })
  amount!: string;

  @Column({ type: DataType.STRING(255) })
  details!: string;

  @Column({ type: DataType.DATE(6) })
  created!: Date;

  @HasOne(() => bid, { sourceKey: 'id' })
  bid?: bid;
}
