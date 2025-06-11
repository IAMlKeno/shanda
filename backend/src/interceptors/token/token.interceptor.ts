import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UserAndProfileIdsDto } from 'src/users/dto/user.dto';
import { AccountMappingHandler } from 'src/users/handler/account-mapping.handler';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  constructor(
    private readonly jwtService: JwtService,
    private readonly accountMappingHandler: AccountMappingHandler,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['user-token'];

    if (token) {
      try {
        const decoded = this.jwtService.decode(token);
        const ssoId = decoded?.sub; // Extract the 'sub' property

        if (ssoId) {
          // Call AccountMappingHandler's getUserBySsoid to get the user
          const user: UserAndProfileIdsDto = await this.accountMappingHandler.getUserBySsoid(ssoId);

          if (user && user.id) {
            request.user = user; // Add userId to the request
          } else {
            console.warn('User not found for the given ssoId:', ssoId);
            // Handle the case where the user is not found, possibly by throwing an error or setting a default user ID
          }
        } else {
          console.warn('No "sub" claim found in the token.');
          // Handle the case where the token doesn't have a "sub" claim
        }
      } catch (err) {
        // Handle token verification failure
        console.error('Token verification failed', err);
        // You might want to throw an UnauthorizedException or handle it differently
      }
    }

    return next.handle();
  }
}
