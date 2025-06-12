import { JwtService } from '@nestjs/jwt';
import { TokenInterceptor } from './token.interceptor';
import { AccountMappingHandler } from 'src/users/handler/account-mapping.handler';

describe('TokenInterceptor', () => {
  const mockJwtService: JwtService = {
  } as unknown as JwtService;
  const mockAccountMappingHandler: AccountMappingHandler = {
  } as unknown as AccountMappingHandler;

  it('should be defined', () => {
    expect(new TokenInterceptor(mockJwtService, mockAccountMappingHandler)).toBeDefined();
  });
});
