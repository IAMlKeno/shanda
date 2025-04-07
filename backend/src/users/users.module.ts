import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { user } from 'src/mvc/models';
import { UserHandler } from './handler/user.handler';
import { ProfileHandler } from 'src/profiles/handlers/profiles.handler';
import { ContactInformationHandler } from 'src/contact-information/handlers/contact-information.handler';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserHandler, ProfileHandler, ContactInformationHandler],
  imports: [ SequelizeModule.forFeature([user])],
})
export class UsersModule {}
