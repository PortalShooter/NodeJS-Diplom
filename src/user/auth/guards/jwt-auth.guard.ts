import { ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {
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

      const { sub } = this.jwtService.verify(token);
      const user = await this.userService.findById(sub);

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
