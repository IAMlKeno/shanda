import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { requester } from './requester';
import { vehicle } from './vehicle';

export interface vehicleGarageAttributes {
  id?: string;
}

@Table({ tableName: 'vehicleGarage', timestamps: false })
export class vehicleGarage
  extends Model<vehicleGarageAttributes, vehicleGarageAttributes>
  implements vehicleGarageAttributes
{
  @ForeignKey(() => vehicle)
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'vehicleGarage_pkey', using: 'btree', unique: true })
  id?: string;

  @BelongsTo(() => requester)
  requester?: requester;

  @BelongsTo(() => vehicle)
  vehicle?: vehicle;
}
