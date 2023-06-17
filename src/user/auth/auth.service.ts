import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import {
  CreateUserDto,
  CreateUserDtoResponse,
} from 'src/user/dto/create-user.dto';
import { LoginUserDtoRequest } from 'src/user/dto/login.dto';
import { IUser, Role } from '../interfaces/IUser';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: LoginUserDtoRequest) {
    const user: IUser = await this.validateUser(userDto);
    const token: string = this.createToken(user);
    return {
      token,
      user,
    };
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

  async validateUser(userDto: LoginUserDtoRequest): Promise<IUser> {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.passwordHash,
    );
    if (user && passwordEquals) {
      return {
        contactPhone: user.contactPhone,
        email: user.email,
        id: user._id,
        name: user.name,
        passwordHash: user.passwordHash,
        role: Role[user.role],
      };
    }
    return null;
  }

  createToken(user: IUser) {
    const payload = { username: user.name, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
