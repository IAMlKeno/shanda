import { Module } from '@nestjs/common';
import { ContactInformationService } from './services/contact-information.service';
import { ContactInformationController } from './controllers/contact-information.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { contactInformation } from 'src/mvc/models';
import { ContactInformationHandler } from './handlers/contact-information.handler';
import { contactInfoProviders } from './providers/contact-information.provider';

@Module({
  controllers: [ContactInformationController],
  providers: [
    ContactInformationService,
    ContactInformationHandler,
    ContactInformationController,
    ...contactInfoProviders,
  ],
  imports: [
    SequelizeModule.forFeature([contactInformation]),
  ],
  exports: [
    SequelizeModule,
    ContactInformationController,
    ContactInformationHandler,
    ContactInformationService,
  ],
})
export class ContactInformationModule {}
