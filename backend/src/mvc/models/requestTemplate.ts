import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
} from 'sequelize-typescript';
import { REQUEST_CATEGORY } from '../enums/enum';

export interface requestTemplateAttributes {
  id?: string;
  category?: REQUEST_CATEGORY;
  description?: string;
  summary?: string;
  tags?: object;
}

@Table({ tableName: 'requestTemplates', timestamps: false })
export class requestTemplate
  extends Model<requestTemplateAttributes, requestTemplateAttributes>
  implements requestTemplateAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'requestTemplates_id_key', using: 'btree', unique: true })
  id?: string;

  @Column({ type: DataType.TEXT })
  summary!: string;

  @Column({ type: DataType.TEXT })
  description!: string;

  @Column({ })
  category?: REQUEST_CATEGORY;

  @Column({ type: DataType.JSONB, defaultValue: Sequelize.literal("'{}'::jsonb") })
  tags?: object;

}
