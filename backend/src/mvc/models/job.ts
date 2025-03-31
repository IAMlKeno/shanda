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
import { serviceProvider } from './serviceProvider';
import { booking } from './booking';

export interface jobAttributes {
  id?: string;
  created?: Date;
  providerId: string;
  bookingId: string;
  status?: any;
}

@Table({ tableName: 'job', timestamps: false })
export class job
  extends Model<jobAttributes, jobAttributes>
  implements jobAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'job_pkey', using: 'btree', unique: true })
  id?: string;

  @Column({
    type: DataType.DATE(6),
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  created?: Date;

  @Column({ type: DataType.UUID })
  providerId!: string;

  @Column({ type: DataType.UUID })
  bookingId!: string;

  @Column({ defaultValue: Sequelize.literal("'pending'::job_status") })
  status?: any;

  @HasOne(() => serviceProvider, { sourceKey: 'providerId' })
  serviceProvider?: serviceProvider;

  @HasOne(() => booking, { sourceKey: 'bookingId' })
  booking?: booking;
}
