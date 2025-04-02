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
import { booking } from './booking';
import { requester } from './requester';
import { Payment_Status } from '../enums/enum';

export interface receiptAttributes {
  id?: string;
  transactionNumber: string;
  created: string;
  datePaid: string;
  bookingId: string;
  paymentStatus?: Payment_Status;
  requesterId: string;
}

@Table({ tableName: 'receipt', timestamps: false })
export class receipt
  extends Model<receiptAttributes, receiptAttributes>
  implements receiptAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'receipt_pkey', using: 'btree', unique: true })
  id?: string;

  @Column({ type: DataType.STRING(255) })
  transactionNumber!: string;

  @Column({ type: DataType.STRING })
  created!: string;

  @Column({ type: DataType.STRING })
  datePaid!: string;

  @Column({ type: DataType.UUID })
  bookingId!: string;

  @Column({ defaultValue: Sequelize.literal("'unpaid'::payment_status") })
  paymentStatus?: Payment_Status;

  @Column({ type: DataType.UUID })
  requesterId!: string;

  @HasOne(() => booking, { sourceKey: 'bookingId' })
  booking?: booking;

  @HasOne(() => requester, { sourceKey: 'requesterId' })
  requester?: requester;
}
