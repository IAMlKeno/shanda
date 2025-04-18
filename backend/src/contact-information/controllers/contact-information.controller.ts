import { Controller, HttpStatus } from '@nestjs/common';
import { BaseController } from 'src/mvc/base/base.controller';
import { ContactInformationHandler } from '../handlers/contact-information.handler';
import { ContactInformationListResponse, ContactInformationRequest, ContactInformationResponse } from '../entities/contact-information.entity';
import { ContactInformationDto } from '../dto/contact-information.dto';

@Controller('contact-information')
export class ContactInformationController extends BaseController<ContactInformationHandler, ContactInformationRequest, ContactInformationDto, ContactInformationResponse, ContactInformationListResponse> {

  constructor(
    handler: ContactInformationHandler,
  ) {
    super(handler);
  }

  createDtoFromRequest(request: ContactInformationRequest): ContactInformationDto {
    return new ContactInformationDto(request);
  }
  createResponseFromDto(dto: ContactInformationDto): ContactInformationResponse {
    return { ...dto.info, statusCode: dto.info.id ? HttpStatus.FOUND : HttpStatus.NOT_FOUND };
  }
  createResponseList(list: ContactInformationDto[], total: number): ContactInformationListResponse {
    return {
      results: list.map((contact) => contact.info),
      totalCount: total,
      count: list.length,
      statusCode: list.length == 0 ? HttpStatus.NO_CONTENT : HttpStatus.OK,
    };
  }

}
/*
SAMPLE ADDING SWAGGER CONTEXT TO A CONTROLLER
// src/users/users.controller.ts
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('users') // Tag for grouping
@Controller('users')
export class UsersController {

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: UserEntity, isArray: true }) 
  @Get()
  findAll() { 
    // ... your controller logic 
  }

  // Add decorators for other endpoints 
}
*/