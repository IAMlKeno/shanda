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

export interface accountMappingAttributes {
  id?: string;
  userId: string;
  ssoid: string;
}

@Table({ tableName: 'accountMappingId', timestamps: false })
export class accountMapping
  extends Model<accountMappingAttributes, accountMappingAttributes>
  implements accountMappingAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'accountMappingId_pkey', using: 'btree', unique: true })
  id?: string;

  @Column({ type: DataType.UUID, unique: true })
  userId!: string;

  @Column({ type: DataType.STRING(255), unique: true })
  ssoid!: string;

}
