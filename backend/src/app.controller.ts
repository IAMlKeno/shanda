import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/test')
  async test(@Req() req): Promise<any> {
    return { test: 'data', user: req?.user };
  }
}
