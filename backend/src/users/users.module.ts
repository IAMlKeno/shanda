import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { user } from 'src/mvc/models';
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

@Module({
  controllers: [UsersController],
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
  ],
  imports: [
    SequelizeModule.forFeature([user]),
    forwardRef(() => ProfilesModule),
    forwardRef(() => ContactInformationModule),
    forwardRef(() => RequesterGarageModule),
    forwardRef(() => VehiclesModule),
  ],
  exports: [
    SequelizeModule,
    UserHandler,
  ]
})
export class UsersModule {}
