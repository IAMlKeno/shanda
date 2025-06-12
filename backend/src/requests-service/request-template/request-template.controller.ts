import { Controller, Get, HttpStatus, Param, Query, Req } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestTemplateHandler } from '../handlers/request-template.handler';
import { ErrorResponse } from 'src/mvc/base/http/entities';
import { RequestTemplateListReponse, RequestTemplateResponse } from '../entities/requestTemplate-response.entity';
import { convertQueryToRecord } from 'src/utils/misc.utils';
import { Request } from 'express';
import { RequestTemplateDto } from '../dtos/request-template.dto';

@ApiTags('requestTemplates')
@Controller('request/templates')
export class RequestTemplateController {
  constructor(
    private readonly requestTemplateHandler: RequestTemplateHandler,
  ) {}

  @ApiOperation({ summary: 'Get a requests template', operationId: 'getRequestTemplate'})
  @ApiResponse({ status: HttpStatus.OK, description: 'Got request templates', type: RequestTemplateResponse })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Failed to get request templates', type: ErrorResponse })
  @Get('/:templatId')
  async getTemplate(@Req() req: Request, @Param('templateId') id: string): Promise<RequestTemplateResponse | ErrorResponse> {
    try {
      const response: RequestTemplateDto = await this.requestTemplateHandler.get(id);
      return new RequestTemplateResponse(response.info);
    } catch (error: any) {
      return new ErrorResponse(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Get all requests template', operationId: 'getRequestTemplates'})
  @ApiResponse({ status: HttpStatus.OK, description: 'Got request templatess', type: RequestTemplateListReponse })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Failed to get request templates', type: ErrorResponse })
  @ApiQuery({ name: 'type', description: 'Template type "service_request", "parts_request"', required: false })
  @Get('')
  async getTemplates(
    @Req() req: Request,
    @Query('page') page: number,
    @Query('size') size: number,
  ): Promise<RequestTemplateListReponse | ErrorResponse> {
    try {
      let params = convertQueryToRecord(req.query, {});
      const response = await this.requestTemplateHandler.getAll(page, size, params)
      return RequestTemplateListReponse.mapToListResponse(response);
    } catch (error: any) {
      return new ErrorResponse(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
