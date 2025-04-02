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
import { companyInformation } from './companyInformation';
import { garageOwner } from './garageOwner';
import { user } from './user';

export interface contactInformationAttributes {
  id?: string;
  phone: string;
  email: string;
}

@Table({ tableName: 'contactInformation', timestamps: false })
export class contactInformation
  extends Model<contactInformationAttributes, contactInformationAttributes>
  implements contactInformationAttributes
{
  @ForeignKey(() => garageOwner)
  @ForeignKey(() => requester)
  @ForeignKey(() => serviceProvider)
  @ForeignKey(() => companyInformation)
  @ForeignKey(() => user)
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'contactInformation_pkey', using: 'btree', unique: true })
  id?: string;

  @Column({ type: DataType.STRING(255) })
  phone!: string;

  @Column({ type: DataType.STRING(255) })
  email!: string;

  @BelongsTo(() => serviceProvider)
  serviceProvider?: serviceProvider;

  @BelongsTo(() => requester)
  requester?: requester;

  @BelongsTo(() => companyInformation)
  companyInformation?: companyInformation;

  @BelongsTo(() => garageOwner)
  garageOwner?: garageOwner;
}
