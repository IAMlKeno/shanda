import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { BaseDbService } from 'src/mvc/base/data/base.service';
import { user as User } from 'src/mvc/models';
import { Optional } from 'sequelize';
import { NullishPropertiesOf } from 'sequelize/types/utils';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService extends BaseDbService<User, UserDto> {

  constructor(@InjectModel(User) model: typeof User) {
    super(model);
  }

  async getUserAndProfiles(userId: string): Promise<any> {
    // await this.model.findByPk(userId);
    // const [ providerId, requesterId ownerId ] = Promise.all([
    //   // requesterser
    // ])
    return '';
  }

  mapToDto(model: any): UserDto {
    return new UserDto(model);
  }

  mapToModel(dto: UserDto): Optional<User, NullishPropertiesOf<User>> {
    return new User(dto);
  }
}
