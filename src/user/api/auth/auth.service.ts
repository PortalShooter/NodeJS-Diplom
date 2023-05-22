import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
// import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService, // private JwtService: JwtService,
  ) {}

  async login(email, pass) {
    const user = await this.userService.getUserByEmail(email);
    if (user?.passwordHash !== pass) {
      throw new UnauthorizedException();
    }
    // const payload = { sub: user.userId, username: user.username };
    // return {
    //   access_token: await this.jwtService.signAsync(payload),
    // };
  }

  logout(): string {
    return 'Hello World!';
  }

  async register(userDto: CreateUserDto) {
    const { email } = userDto;
    const candidate = await this.userService.getUserByEmail(email);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);

    const createUser = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    console.log('createUser', createUser);
    if (createUser) {
      return {
        id: createUser.id,
        email: createUser.email,
        name: createUser.name,
      };
    } else {
      throw new HttpException(
        'Произошла ошибка при создании пользователя',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // private async generateToken(user: User) {
  //   const payload = { email: user.email, id: user.id, roles: user.roles };
  //   return {
  //     token: this.jwtService.sign(payload),
  //   };
  // }
}
