import { ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const necessaryRole = req.originalUrl.split('/')[2];

    try {
      const token = req.cookies.access_token;
      if (!token) {
        throw new HttpException('Пользователь не аутентифицирован', 401);
        // throw new UnauthorizedException(
        //   'Пользователь не аутентифицирован',
        //   '401',
        // );
      }
      const user = await this.authService.getUserByToken(token);

      if (necessaryRole == 'common') {
        return true;
      } else if (user.role == necessaryRole) {
        return true;
      } else {
        throw new HttpException(
          'У пользователя нет доступа для этого действия',
          403,
        );
      }
    } catch (e) {
      console.log(e);
    }
  }
}
