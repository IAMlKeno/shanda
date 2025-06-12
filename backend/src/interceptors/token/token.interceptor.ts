import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UserAndProfileIdsDto } from 'src/users/dto/user.dto';
import { AccountMappingHandler } from 'src/users/handler/account-mapping.handler';

@Injectable()
export class TokenInterceptor implements NestInterceptor {

  readonly bypassTokenCheck: string[] = [
    '/forms',
  ];
  constructor(
    private readonly jwtService: JwtService,
    private readonly accountMappingHandler: AccountMappingHandler,
  ) {}

  private canBypass(url: string): boolean {
    return this.bypassTokenCheck.some((path) => url.includes(path));
  }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['user-token'];
    // If bypass endpoint
    if (this.canBypass(request?.url)) {
      return next.handle();
    }

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const decoded = this.jwtService.decode(token);
      const ssoId = decoded?.sub; // Extract the 'sub' property

      if (!ssoId) {
        throw new UnauthorizedException();
      }

      const user: UserAndProfileIdsDto = await this.accountMappingHandler.getUserBySsoid(ssoId);

      if (user && user.id) {
        request.user = user; // Add userId to the request
      } else {
        throw new UnauthorizedException();
      }
    } catch (err) {
      throw new UnauthorizedException();
    }

    return next.handle();
  }
}
