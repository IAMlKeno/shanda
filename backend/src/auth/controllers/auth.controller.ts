import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiExcludeController } from "@nestjs/swagger";

@ApiExcludeController()
@Controller()
export class AuthController {
  @UseGuards(AuthGuard('jwt'))
  @Get('auth/login')
  async login(@Req() req) {
    return req.user;
  } 

  // @UseGuards(AuthGuard('jwt'))
  @Get('auth/logout')
  async logout(@Req() req) {
    return 'req.logout();'
  }
}