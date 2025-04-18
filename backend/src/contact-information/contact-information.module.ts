import { Module } from '@nestjs/common';
import { ContactInformationService } from './services/contact-information.service';
import { ContactInformationController } from './controllers/contact-information.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { contactInformation } from 'src/mvc/models';
import { ContactInformationHandler } from './handlers/contact-information.handler';

@Module({
  controllers: [ContactInformationController],
  providers: [
    ContactInformationService, ContactInformationHandler],
  imports: [
    SequelizeModule.forFeature([contactInformation]),
  ],
})
export class ContactInformationModule {}
