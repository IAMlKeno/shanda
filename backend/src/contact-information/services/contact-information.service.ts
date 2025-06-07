import { Inject, Injectable } from '@nestjs/common';
import { ContactInformationDto } from '../dto/contact-information.dto';
import { BaseDbService } from 'src/mvc/base/data/base.service';
import { contactInformation } from 'src/mvc/models';
import { Optional } from 'sequelize';
import { NullishPropertiesOf } from 'sequelize/types/utils';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ContactInformationService extends BaseDbService<contactInformation, ContactInformationDto> {

  constructor(
    @InjectModel(contactInformation)
    @Inject('CONTACT_INFO_REPOSITORY')
    model: typeof contactInformation,
  ) { super(model); }

  mapToDto(model: contactInformation): ContactInformationDto {
    return new ContactInformationDto(model);
  }
  mapToModel(dto: ContactInformationDto): Optional<contactInformation, NullishPropertiesOf<contactInformation>> {
    return new contactInformation(dto.info);
  }
}
