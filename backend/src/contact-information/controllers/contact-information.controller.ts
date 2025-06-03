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
    return new ContactInformationResponse(dto);
  }
  createResponseList(list: ContactInformationDto[], total: number): ContactInformationListResponse {
    return new ContactInformationListResponse(list.map((contact) => contact.info), total);
  }

}
