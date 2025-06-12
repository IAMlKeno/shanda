import { ApiProperty } from "@nestjs/swagger";
import { API_DESCRIPTION_REQUEST_CATEGORY, API_DESCRIPTION_REQUEST_TAGS } from "src/api-constants";
import { createEnumList, REQUEST_CATEGORY, REQUEST_TAGS } from "src/mvc/enums/enum";
import { requestTemplateAttributes } from "src/mvc/models/requestTemplate";

export class RequestTemplateDto {
  info: requestTemplateAttributes;
  @ApiProperty()
  id?: string;
  @ApiProperty()
  summary?: string;
  @ApiProperty()
  description?: string;
  @ApiProperty({
    description: API_DESCRIPTION_REQUEST_TAGS,
    isArray: true,
    enum: Object.keys(REQUEST_TAGS),
    enumName: 'REQUEST_TAGS',
    required: false,
  })
  tags?: REQUEST_TAGS[];
  @ApiProperty({
    description: API_DESCRIPTION_REQUEST_CATEGORY,
    isArray: true,
    enum: Object.keys(REQUEST_CATEGORY),
    enumName: 'REQUEST_CATEGORY',
    required: false,
  })
  category?: REQUEST_CATEGORY;

  constructor(row: any) {
    this.info = {
      id: row.id,
      summary: row.summary,
      description: row.description,
      category: row.category,
      tags: createEnumList<REQUEST_TAGS>(REQUEST_TAGS, row.tags),
    };
  }
}
