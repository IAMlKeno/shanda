import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiHeader, ApiOperation } from '@nestjs/swagger';

@Controller('register')
export class RegistrationController {

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Creates a user entry using ssoid from Auth0', operationId: 'registerUser'})
  @ApiHeader({ name: 'user-token', description: 'auth0 authentation token (jwt)'})
  @Post('/')
  async register(@Req() req: Request): Promise<any> {
    const token = req.headers['user-token'];

  }
}
