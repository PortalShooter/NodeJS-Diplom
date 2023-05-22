import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDtoResponse } from 'src/user/dto/create-user.dto';

@ApiTags('Auth')
@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Вход' })
  @Post('/auth/login')
  login() {
    //TODO - add body
    // return this.authService.login();
  }

  @ApiOperation({ summary: 'Выход' })
  @Post('/auth/logout')
  logout() {
    //TODO - add body
    return this.authService.logout();
  }

  @ApiOperation({ summary: 'Регистрация пользователя' })
  // @ApiResponse({ status: 200 })
  @Post('/client/register')
  register(@Body() body) {
    return this.authService.register(body);
  }
}
