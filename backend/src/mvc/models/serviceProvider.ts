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
import { companyInformation } from './companyInformation';
import { contactInformation } from './contactInformation';
import { bid } from './bid';
import { job } from './job';

export interface serviceProviderAttributes {
  id?: string;
  userId: string;
  companyId?: string;
  contactInfoId: string;
}

@Table({ tableName: 'serviceProvider', timestamps: false })
export class serviceProvider
  extends Model<serviceProviderAttributes, serviceProviderAttributes>
  implements serviceProviderAttributes
{
  @ForeignKey(() => job)
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'serviceProvider_pkey', using: 'btree', unique: true })
  id?: string;

  @Column({ type: DataType.UUID })
  userId!: string;

  @Column({ allowNull: true, type: DataType.UUID })
  companyId?: string;

  @Column({ type: DataType.UUID })
  contactInfoId!: string;

  @HasOne(() => user, { sourceKey: 'userId' })
  user?: user;

  @HasOne(() => companyInformation, { sourceKey: 'companyId' })
  companyInformation?: companyInformation;

  @HasOne(() => contactInformation, { sourceKey: 'contactInfoId' })
  contactInformation?: contactInformation;

  @BelongsTo(() => bid)
  bid?: bid;

  @BelongsTo(() => job)
  job?: job;
}
