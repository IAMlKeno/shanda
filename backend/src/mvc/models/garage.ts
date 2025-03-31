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
import { booking } from './booking';
import { garageOwner } from './garageOwner';

export interface garageAttributes {
  id?: string;
  nickname: string;
  location: object;
  ownerId: string;
}

@Table({ tableName: 'garage', timestamps: false })
export class garage
  extends Model<garageAttributes, garageAttributes>
  implements garageAttributes
{
  @ForeignKey(() => booking)
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'garage_pkey', using: 'btree', unique: true })
  id?: string;

  @Column({ type: DataType.STRING(255) })
  nickname!: string;

  @Column({ type: DataType.JSONB })
  location!: object;

  @Column({ type: DataType.UUID })
  ownerId!: string;

  @BelongsTo(() => booking)
  booking?: booking;

  @HasOne(() => garageOwner, { sourceKey: 'ownerId' })
  garageOwner?: garageOwner;
}
