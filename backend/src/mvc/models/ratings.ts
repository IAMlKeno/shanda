import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface ratingsAttributes {
  id?: string;
  rating: string;
  referenceId: string;
  created?: Date;
  modified: Date;
  createdBy: string;
  note?: string;
}

@Table({ tableName: 'ratings', timestamps: false })
export class ratings
  extends Model<ratingsAttributes, ratingsAttributes>
  implements ratingsAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'ratings_pkey', using: 'btree', unique: true })
  id?: string;

  @Column({ type: DataType.DECIMAL(2, 1) })
  rating!: string;

  @Column({ type: DataType.UUID })
  referenceId!: string;

  @Column({
    type: DataType.DATE(6),
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  created?: Date;

  @Column({ type: DataType.DATE(6) })
  modified!: Date;

  @Column({ type: DataType.UUID })
  createdBy!: string;

  @Column({ allowNull: true, type: DataType.STRING })
  note?: string;
}
