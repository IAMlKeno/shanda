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

    return '';
  }

  async getUserByUsername(username: string): Promise<UserDto> {
    const where = this.convertToWhere({ username: username });
    return this.mapToDto(await this.model.findOne(where))
  }

  async getUserByAuthId(ssoid: string): Promise<UserDto | undefined> {
    const result = await this.model.sequelize.query(`
    select u.id, u."firstName", u."lastName", u.username, u.created, u.deleted, u."contactInfoId", u.status
    from public."accountMappingId" ami
    join public."user" u on u.id = ami."userId"
    where ami.ssoid = '${ssoid}'
      `, {
        mapToModel: true,
        model: this.model,
      });
    return result?.length > 0 ? this.mapToDto(result[0]) : undefined;
  }

  mapToDto(model: any): UserDto {
    return new UserDto(model);
  }

  mapToModel(dto: UserDto): Optional<User, NullishPropertiesOf<User>> {
    return new User(dto.user);
  }
}
