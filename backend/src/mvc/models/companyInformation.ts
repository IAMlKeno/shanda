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
import { serviceProvider } from './serviceProvider';
import { contactInformation } from './contactInformation';

export interface companyInformationAttributes {
  id?: string;
  companyName: string;
  contactInformation: string;
  binNumber: string;
}

@Table({ tableName: 'companyInformation', timestamps: false })
export class companyInformation
  extends Model<companyInformationAttributes, companyInformationAttributes>
  implements companyInformationAttributes
{
  @ForeignKey(() => serviceProvider)
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'companyInformation_pkey', using: 'btree', unique: true })
  id?: string;

  @Column({ type: DataType.STRING(255) })
  companyName!: string;

  @Column({ type: DataType.UUID })
  contactInformation!: string;

  @Column({ type: DataType.STRING(255) })
  binNumber!: string;

  @BelongsTo(() => serviceProvider)
  serviceProvider?: serviceProvider;

  @HasOne(() => contactInformation, { sourceKey: 'contactInformation' })
  contactInformation?: contactInformation;
}
