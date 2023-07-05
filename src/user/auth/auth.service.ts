import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import {
  CreateUserDto,
  CreateUserDtoResponse,
} from 'src/user/dto/create-user.dto';
import { LoginUserDtoRequest } from 'src/user/dto/login.dto';
import { IUser } from '../interfaces/IUser';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(userDto: LoginUserDtoRequest) {
    const user: IUser = await this.validateUser(userDto);
    const token: string = this.createToken(user);
    return {
      token,
      user,
    };
  }

  async register(userDto: CreateUserDto): Promise<CreateUserDtoResponse> {
    const { email } = userDto;
    const candidate = await this.userService.findByEmail(email);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const passwordHash: string = await bcrypt.hash(userDto.password, 5);

    const createUser = await this.userService.create({
      ...userDto,
      passwordHash,
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

  async validateUser(userDto: LoginUserDtoRequest): Promise<IUser> {
    const user = await this.userService.findByEmail(userDto.email);
    if (!user) {
      throw new HttpException(
        'Такого email не существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.passwordHash,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new HttpException(
      'Неправильный логин или пароль',
      HttpStatus.BAD_REQUEST,
    );
  }

  getUserByToken(token: string) {
    const { sub } = this.jwtService.verify(token);
    return this.userService.findById(sub);
  }

  createToken(user: IUser) {
    const payload = { username: user.name, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
