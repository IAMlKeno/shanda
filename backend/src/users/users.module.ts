import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { contactInformation, user } from 'src/mvc/models';
import { UserHandler } from './handler/user.handler';
import { ProfileHandler } from 'src/profiles/handlers/profiles.handler';
import { ContactInformationHandler } from 'src/contact-information/handlers/contact-information.handler';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { ContactInformationModule } from 'src/contact-information/contact-information.module';
import { GarageOwnerService } from 'src/profiles/services/owner.service';
import { RequesterService } from 'src/profiles/services/requester.service';
import { ProviderService } from 'src/profiles/services/provider.service';
import { ContactInformationService } from 'src/contact-information/services/contact-information.service';
import { RequesterGarageHandler } from 'src/requester-garage/handlers/requester-garage.handler';
import { RequesterGarageService } from 'src/requester-garage/services/requester-garage.service';
import { RequesterGarageModule } from 'src/requester-garage/requester-garage.module';
import { VehiclesModule } from 'src/vehicles/vehicles.module';
import { VehicleHandler } from 'src/vehicles/handlers/vehicle.handler';
import { VehiclesService } from 'src/vehicles/services/vehicles.service';
import { RegistrationController } from './controllers/registration/registration.controller';
import { JwtService } from '@nestjs/jwt';
import { accountMapping } from 'src/mvc/models/accountMapping';
import { AccountMappingHandler } from './handler/account-mapping.handler';
import { AccountMappingService } from './services/account-mapping.service';
import { accountMappingProviders } from './providers/account-mapping.provider';

@Module({
  controllers: [UsersController, RegistrationController],
  providers: [
    UsersService,
    UserHandler,
    ContactInformationHandler,
    ContactInformationService,
    ProfileHandler,
    GarageOwnerService,
    RequesterService,
    ProviderService,
    RequesterGarageHandler,
    RequesterGarageService,
    VehicleHandler,
    VehiclesService,
    JwtService,
    UsersController,
    AccountMappingHandler,
    AccountMappingService,
    ...accountMappingProviders,
  ],
  imports: [
    SequelizeModule.forFeature([
      user,
      contactInformation,
      accountMapping,
    ]),
    forwardRef(() => ProfilesModule),
    forwardRef(() => ContactInformationModule),
    forwardRef(() => RequesterGarageModule),
    forwardRef(() => VehiclesModule),
  ],
  exports: [
    SequelizeModule,
    UserHandler,
    UsersService,
    AccountMappingHandler,
    AccountMappingService,
  ]
})
export class UsersModule {}
