import { BaseHandler } from "src/mvc/base/handlers/base.handler";
import { ContactInformationService } from "../services/contact-information.service";
import { ContactInformationDto } from "../dto/contact-information.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ContactInformationHandler extends BaseHandler<ContactInformationService, ContactInformationDto> {
  constructor(dbService: ContactInformationService) {
    super(dbService);
  }

}