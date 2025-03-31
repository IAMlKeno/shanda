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
import { serviceProvider } from './serviceProvider';
import { requester } from './requester';
import { garageOwner } from './garageOwner';
import { UserStatus } from '../enums/enum';

export interface userAttributes {
  id?: string;
  firstName: string;
  lastName: string;
  username: string;
  created?: Date;
  deleted?: Date;
  status?: UserStatus;
}

@Table({ tableName: 'user', timestamps: false })
export class user
  extends Model<userAttributes, userAttributes>
  implements userAttributes
{
  @ForeignKey(() => garageOwner)
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'user_pkey', using: 'btree', unique: true })
  id?: string;

  @Column({ type: DataType.STRING(255) })
  firstName!: string;

  @Column({ type: DataType.STRING(255) })
  lastName!: string;

  @Column({ type: DataType.STRING(255) })
  @Index({ name: 'user_username_key', using: 'btree', unique: true })
  username!: string;

  @Column({
    type: DataType.DATE(6),
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  created?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  deleted?: Date;

  @Column({ defaultValue: Sequelize.literal("'pending'::user_status") })
  status?: any;

  @BelongsTo(() => serviceProvider)
  serviceProvider?: serviceProvider;

  @BelongsTo(() => requester)
  requester?: requester;

  @BelongsTo(() => garageOwner)
  garageOwner?: garageOwner;
}
