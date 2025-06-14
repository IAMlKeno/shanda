import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MvcModule } from './mvc/mvc.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { bid, bidRevision, booking, companyInformation, contactInformation, garage, garageOwner, job, maintenanceLog, ratings, receipt, request, requester, serviceProvider, user, vehicle, vehicleGarage } from './mvc/models';
import { ConfigModule } from '@nestjs/config';
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
import { UsersService } from './users/services/users.service';
import { UserHandler } from './users/handler/user.handler';
import { RequesterGarageService } from './requester-garage/services/requester-garage.service';
import { GarageOwnerService } from './profiles/services/owner.service';
import { ProviderService } from './profiles/services/provider.service';
import { VehiclesService } from './vehicles/services/vehicles.service';
import { MaintenanceLogService } from './maintenance-log/services/maintenance-log.service';
import { CompanyService } from './company/services/company.service';
import { BookingsService } from './bookings/services/bookings.service';
import { BiddingService } from './bidding/services/bidding.service';
import { ContactInformationHandler } from './contact-information/handlers/contact-information.handler';
import { RequesterGarageHandler } from './requester-garage/handlers/requester-garage.handler';
import { ProfileHandler } from './profiles/handlers/profiles.handler';
import { VehicleHandler } from './vehicles/handlers/vehicle.handler';
import { MaintenanceLogHandler } from './maintenance-log/handlers/maintenance-log.handler';
import { CompanyHandler } from './company/handlers/company.handler';
import { BookingHandler } from './bookings/handlers/booking.handler';
import { BiddingHandler } from './bidding/handlers/bidding.handler';
import { RequesterService } from './profiles/services/requester.service';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthService } from './auth/auth.service';
import { FormsControllerController } from './common/forms-controller/forms-controller.controller';
import { accountMapping } from './mvc/models/accountMapping';
import { RequestsService } from './requests-service/requests.service';
import { TokenInterceptor } from './interceptors/token/token.interceptor';
import { JwtService } from '@nestjs/jwt';
import { requestTemplate } from './mvc/models/requestTemplate';
import { RequestTemplateController } from './requests-service/request-template/request-template.controller';
import { RequestTemplateService } from './requests-service/request-template.service';
import { RequestTemplateHandler } from './requests-service/handlers/request-template.handler';
import { VehiclesController } from './vehicles/controllers/vehicles.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.NODE_DB_HOST ?? 'localhost',
      port: parseInt(process.env.NODE_DB_PORT) ?? 5432,
      username: process.env.NODE_DB_USERNAME,
      password: process.env.NODE_DB_PASSWORD,
      database: process.env.NODE_DB,
      retry: {
        max: process.env.NODE_DB_RETRIES ? Number(process.env.NODE_DB_RETRIES) : 3,
      },
      models: [
        accountMapping,
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
        requestTemplate,
        requester,
        serviceProvider,
        user,
        vehicle,
        vehicleGarage,
      ],
    }),
    UsersModule,
    MvcModule,
    ProfilesModule,
    ContactInformationModule,
    HostGarageModule,
    RequesterGarageModule,
    CompanyModule,
    BookingsModule,
    VehiclesModule,
    BiddingModule,
    MaintenanceLogModule,
    AuthModule,
  ],
  controllers: [
    AppController,
    FormsControllerController,
    RequestTemplateController,
    VehiclesController,
  ],
  providers: [
    AppService,
    UsersService,
    UserHandler,
    ContactInformationService,
    ContactInformationHandler,
    RequesterGarageService,
    RequesterGarageHandler,
    GarageOwnerService,
    ProfileHandler,
    ProviderService,
    VehiclesService,
    VehicleHandler,
    MaintenanceLogService,
    MaintenanceLogHandler,
    CompanyService,
    CompanyHandler,
    BookingsService,
    BookingHandler,
    BiddingService,
    BiddingHandler,
    RequesterService,
    RequestsService,
    RequestTemplateService,
    RequestTemplateHandler,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthService,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TokenInterceptor,
    },
  ],
})
export class AppModule {}
