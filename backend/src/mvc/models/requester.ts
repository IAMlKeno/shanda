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
import { user } from './user';
import { contactInformation } from './contactInformation';
import { vehicleGarage } from './vehicleGarage';
import { request } from './request';
import { receipt } from './receipt';

export interface requesterAttributes {
  id?: string;
  userId: string;
  contactInfoId: string;
  garageId?: string;
}

@Table({ tableName: 'requester', timestamps: false })
export class requester
  extends Model<requesterAttributes, requesterAttributes>
  implements requesterAttributes
{
  @ForeignKey(() => receipt)
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'requester_pkey', using: 'btree', unique: true })
  id?: string;

  @Column({ type: DataType.UUID })
  userId!: string;

  @Column({ type: DataType.UUID })
  contactInfoId!: string;

  @Column({ allowNull: true, type: DataType.UUID })
  garageId?: string;

  @HasOne(() => user, { sourceKey: 'userId' })
  user?: user;

  @HasOne(() => contactInformation, { sourceKey: 'contactInfoId' })
  contactInformation?: contactInformation;

  @HasOne(() => vehicleGarage, { sourceKey: 'garageId' })
  vehicleGarage?: vehicleGarage;

  @BelongsTo(() => request)
  request?: request;

  @BelongsTo(() => receipt)
  receipt?: receipt;
}
