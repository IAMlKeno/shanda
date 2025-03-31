import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
  HasOne,
} from 'sequelize-typescript';
import { receipt } from './receipt';
import { job } from './job';
import { request } from './request';
import { bid } from './bid';
import { garage } from './garage';

export interface bookingAttributes {
  id?: string;
  created: Date;
  acceptedDate?: Date;
  completionDate?: Date;
  notes?: string;
  requestId: string;
  winningBidId?: string;
  expectedCompletionDate: string;
  garageId?: string;
}

@Table({ tableName: 'booking', timestamps: false })
export class booking
  extends Model<bookingAttributes, bookingAttributes>
  implements bookingAttributes
{
  @ForeignKey(() => job)
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'booking_pkey', using: 'btree', unique: true })
  id?: string;

  @Column({ type: DataType.DATE(6) })
  created!: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  acceptedDate?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  completionDate?: Date;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  notes?: string;

  @Column({ type: DataType.UUID })
  requestId!: string;

  @Column({ allowNull: true, type: DataType.UUID })
  winningBidId?: string;

  @Column({ type: DataType.STRING })
  expectedCompletionDate!: string;

  @Column({ allowNull: true, type: DataType.UUID })
  garageId?: string;

  @BelongsTo(() => receipt)
  receipt?: receipt;

  @BelongsTo(() => job)
  job?: job;

  @HasOne(() => request, { sourceKey: 'requestId' })
  request?: request;

  @HasOne(() => bid, { sourceKey: 'winningBidId' })
  bid?: bid;

  @HasOne(() => garage, { sourceKey: 'garageId' })
  garage?: garage;
}
