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
import { vehicle } from './vehicle';

export interface maintenanceLogAttributes {
  id?: string;
  details?: object;
}

@Table({ tableName: 'maintenanceLog', timestamps: false })
export class maintenanceLog
  extends Model<maintenanceLogAttributes, maintenanceLogAttributes>
  implements maintenanceLogAttributes
{
  @ForeignKey(() => vehicle)
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'maintenanceLog_pkey', using: 'btree', unique: true })
  id?: string;

  @Column({
    type: DataType.JSONB,
    defaultValue: Sequelize.literal("'{}'::jsonb"),
  })
  details?: object;

  @BelongsTo(() => vehicle)
  vehicle?: vehicle;
}
