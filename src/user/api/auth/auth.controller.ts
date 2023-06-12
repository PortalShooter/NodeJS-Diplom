import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateUserDto,
  CreateUserDtoResponse,
} from 'src/user/dto/create-user.dto';
import { LoginUserDtoRequest } from 'src/user/dto/login.dto';

@ApiTags('Auth')
@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Вход' })
  @Post('/auth/login')
  login(@Body() body: LoginUserDtoRequest) {
    return this.authService.login({
      email: body.email,
      password: body.password,
    });
  }

  @ApiOperation({ summary: 'Выход' })
  @Post('/auth/logout')
  logout() {
    //TODO - add body
    return this.authService.logout();
  }

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 200 })
  @Post('/client/register')
  register(@Body() body: CreateUserDto) {
    return this.authService.register(body);
  }
}
