import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasOne,
  BelongsTo,
} from 'sequelize-typescript';
import { serviceProvider } from './serviceProvider';
import { bidRevision } from './bidRevision';
import { request } from './request';
import { booking } from './booking';

export interface bidAttributes {
  id?: string;
  bidderId: string;
  revisionId: string;
  requestId: string;
}

@Table({ tableName: 'bid', timestamps: false })
export class bid
  extends Model<bidAttributes, bidAttributes>
  implements bidAttributes
{
  @ForeignKey(() => booking)
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'bid_pkey', using: 'btree', unique: true })
  id?: string;

  @Column({ type: DataType.UUID })
  bidderId!: string;

  @ForeignKey(() => bidRevision)
  @Column({ type: DataType.UUID })
  revisionId!: string;

  @Column({ type: DataType.UUID })
  requestId!: string;

  @HasOne(() => serviceProvider, { sourceKey: 'bidderId' })
  serviceProvider?: serviceProvider;

  @BelongsTo(() => bidRevision)
  bidRevision?: bidRevision;

  @HasOne(() => request, { sourceKey: 'id' })
  request?: request;

  @BelongsTo(() => booking)
  booking?: booking;
}
