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
import { garage } from './garage';
import { user } from './user';
import { contactInformation } from './contactInformation';

export interface garageOwnerAttributes {
  id?: string;
  user?: string;
  garage: string;
  contactInfo: string;
}

@Table({ tableName: 'garageOwner', timestamps: false })
export class garageOwner
  extends Model<garageOwnerAttributes, garageOwnerAttributes>
  implements garageOwnerAttributes
{
  @ForeignKey(() => garage)
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'garageOwner_pkey', using: 'btree', unique: true })
  id?: string;

  @Column({ allowNull: true, type: DataType.UUID })
  user?: string;

  @Column({ type: DataType.UUID })
  garage!: string;

  @Column({ type: DataType.UUID })
  contactInfo!: string;

  @BelongsTo(() => garage)
  garage?: garage;

  @HasOne(() => user, { sourceKey: 'user' })
  user?: user;

  @HasOne(() => contactInformation, { sourceKey: 'contactInfo' })
  contactInformation?: contactInformation;
}
