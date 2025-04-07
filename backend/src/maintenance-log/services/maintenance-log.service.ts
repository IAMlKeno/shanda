import { Injectable } from '@nestjs/common';
import { BaseDbService } from 'src/mvc/base/data/base.service';
import { maintenanceLog } from 'src/mvc/models';
import { VehicleLogDto } from '../dto/maintenance-log.dto';
import { Optional } from 'sequelize';
import { NullishPropertiesOf } from 'sequelize/types/utils';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class MaintenanceLogService extends BaseDbService<maintenanceLog, VehicleLogDto> {

  constructor(@InjectModel(maintenanceLog) model: typeof maintenanceLog) { super(model); }

  mapToDto(model: maintenanceLog): VehicleLogDto {
    return new VehicleLogDto(model);
  }
  mapToModel(dto: VehicleLogDto): Optional<maintenanceLog, NullishPropertiesOf<maintenanceLog>> {
    return new maintenanceLog(dto);
  }
}