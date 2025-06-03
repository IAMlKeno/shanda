import { Controller } from '@nestjs/common';
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
    return new CompanyResponse(dto);
  }
  createResponseList(list: CompanyDto[], total: number): CompanyListResponse {
    return new CompanyListResponse(list.map((company) => company.company), total);
  }

}
