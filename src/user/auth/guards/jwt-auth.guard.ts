import {
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/user/interfaces/IUser';
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

      // if (user.role !== Role.admin) {
      //   throw new HttpException(
      //     'У пользователя нет доступа для этого действия',
      //     403,
      //   );
      // }
      console.log(user);
      return true;
    } catch (e) {
      console.log(e);
    }
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    // return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
