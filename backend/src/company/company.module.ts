import { Module } from '@nestjs/common';
import { CompanyService } from './services/company.service';
import { CompanyController } from './controllers/company.controller';
import { companyInformation, contactInformation, serviceProvider } from 'src/mvc/models';
import { SequelizeModule } from '@nestjs/sequelize';
import { CompanyHandler } from './handlers/company.handler';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, CompanyHandler],
  imports: [
    SequelizeModule.forFeature([companyInformation, contactInformation, serviceProvider]),
  ],
  exports: [
    SequelizeModule,
  ],
})
export class CompanyModule {}
