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
import { requester } from './requester';
import { bid } from './bid';
import { booking } from './booking';

export interface requestAttributes {
  id?: string;
  summary: string;
  description: string;
  vehicleId: string;
  requesterId: string;
}

@Table({ tableName: 'request', timestamps: false })
export class request
  extends Model<requestAttributes, requestAttributes>
  implements requestAttributes
{
  @ForeignKey(() => booking)
  @ForeignKey(() => bid)
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'request_pkey', using: 'btree', unique: true })
  id?: string;

  @Column({ type: DataType.STRING(255) })
  summary!: string;

  @Column({ type: DataType.TEXT })
  description!: string;

  @Column({ type: DataType.UUID })
  vehicleId!: string;

  @Column({ type: DataType.UUID })
  requesterId!: string;

  @HasOne(() => requester, { sourceKey: 'requesterId' })
  requester?: requester;

  @BelongsTo(() => bid)
  bid?: bid;

  @BelongsTo(() => booking)
  booking?: booking;
}
