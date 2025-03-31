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
import { vehicleGarage } from './vehicleGarage';
import { maintenanceLog } from './maintenanceLog';

export interface vehicleAttributes {
  id?: string;
  vin: string;
  vehicleInformation: object;
  garageId?: string;
  vehicleLog: string;
}

@Table({ tableName: 'vehicle', timestamps: false })
export class vehicle
  extends Model<vehicleAttributes, vehicleAttributes>
  implements vehicleAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'vehicle_pkey', using: 'btree', unique: true })
  id?: string;

  @Column({ type: DataType.STRING(17) })
  vin!: string;

  @Column({ type: DataType.JSONB })
  vehicleInformation!: object;

  @Column({ allowNull: true, type: DataType.UUID })
  garageId?: string;

  @Column({ type: DataType.UUID })
  vehicleLog!: string;

  @HasOne(() => vehicleGarage, { sourceKey: 'garageId' })
  vehicleGarage?: vehicleGarage;

  @HasOne(() => maintenanceLog, { sourceKey: 'vehicleLog' })
  maintenanceLog?: maintenanceLog;
}
