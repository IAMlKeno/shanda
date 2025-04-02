import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MvcModule } from './mvc/mvc.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { bid, bidRevision, booking, companyInformation, contactInformation, garage, garageOwner, job, maintenanceLog, ratings, receipt, request, requester, serviceProvider, user, vehicle, vehicleGarage } from './mvc/models';
import { ConfigModule } from '@nestjs/config';
import { ProfilesController } from './profiles/controllers/profiles.controller';
import { ProfilesModule } from './profiles/profiles.module';
import { MaintenanceLogModule } from './maintenance-log/maintenance-log.module';
import { BiddingModule } from './bidding/bidding.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { BookingsModule } from './bookings/bookings.module';
import { CompanyModule } from './company/company.module';
import { RequesterGarageModule } from './requester-garage/requester-garage.module';
import { HostGarageModule } from './host-garage/host-garage.module';
import { ContactInformationModule } from './contact-information/contact-information.module';
import { ContactInformationService } from './contact-information/services/contact-information.service';

@Module({
  imports: [
    UsersModule,
    MvcModule,
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.NODE_DB_HOST ?? 'localhost',
      port: parseInt(process.env.NODE_DB_PORT) ?? 5432,
      username: process.env.NODE_DB_USERNAME,
      password: process.env.NODE_DB_PASSWORD,
      database: process.env.NODE_DB,
      repositoryMode: true,
      models: [
        bid,
        bidRevision,
        booking,
        companyInformation,
        contactInformation,
        garage,
        garageOwner,
        job,
        maintenanceLog,
        ratings,
        receipt,
        request,
        requester,
        serviceProvider,
        user,
        vehicle,
        vehicleGarage,
      ],
    }),
    ProfilesModule,
    ContactInformationModule,
    HostGarageModule,
    RequesterGarageModule,
    CompanyModule,
    BookingsModule,
    VehiclesModule,
    BiddingModule,
    MaintenanceLogModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
