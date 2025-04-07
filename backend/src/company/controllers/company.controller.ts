import { Controller, HttpStatus } from '@nestjs/common';
import { BaseController } from 'src/mvc/base/base.controller';
import { CompanyHandler } from '../handlers/company.handler';
import { CompanyListResponse, CompanyRequest, CompanyResponse } from '../entities/company.entity';
import { CompanyDto } from '../dto/company.dto';

@Controller('company')
export class CompanyController extends BaseController<CompanyHandler, CompanyRequest, CompanyDto, CompanyResponse, CompanyListResponse> {

  constructor(handler: CompanyHandler) { super(handler); }

  createDtoFromRequest(request: CompanyRequest): CompanyDto {
    return new CompanyDto(request);
  }
  createResponseFromDto(dto: CompanyDto): CompanyResponse {
    return { ...dto.company, statusCode: dto.company.id ? HttpStatus.FOUND : HttpStatus.NOT_FOUND };
  }
  createResponseList(list: CompanyDto[], total: number): CompanyListResponse {
    return {
      results: list.map((company) => company.company),
      totalCount: total,
      count: list.length,
      statusCode: list.length == 0 ? HttpStatus.NO_CONTENT : HttpStatus.OK
    }
  }

}
