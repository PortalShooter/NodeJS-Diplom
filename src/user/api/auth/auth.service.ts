import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
// import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import {
  CreateUserDto,
  CreateUserDtoResponse,
} from 'src/user/dto/create-user.dto';
import {
  LoginUserDtoRequest,
  LoginUserDtoResponse,
} from 'src/user/dto/login.dto';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService, // private JwtService: JwtService,
  ) {}

  async login(userDto: LoginUserDtoRequest): Promise<LoginUserDtoResponse> {
    const user = await this.validateUser(userDto);
    const { contactPhone, email, name } = user;
    //TODO - генерировать токен или точнее реализовать авторизацию с помощью passport.js
    return {
      email,
      name,
      contactPhone,
    };

    // return this.generateToken(user)
    // const payload = { sub: user.userId, username: user.username };
    // return {
    //   access_token: await this.jwtService.signAsync(payload),
    // };
  }

  logout(): string {
    return 'Hello World!';
  }

  async register(userDto: CreateUserDto): Promise<CreateUserDtoResponse> {
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

  private async validateUser(userDto: LoginUserDtoRequest): Promise<User> {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.passwordHash,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message:
        'Пользователя с указанным email не существует или пароль неверный',
    });
  }

  // private async generateToken(user: User) {
  //   const payload = { email: user.email, id: user.id, roles: user.roles };
  //   return {
  //     token: this.jwtService.sign(payload),
  //   };
  // }
}
