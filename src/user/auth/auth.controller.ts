import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDtoRequest } from 'src/user/dto/login.dto';

@ApiTags('Auth')
@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Вход' })
  @Post('/auth/login')
  async login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() body: LoginUserDtoRequest,
  ): Promise<void> {
    const { user, token } = await this.authService.login({
      email: body.email,
      password: body.password,
    });

    res
      .cookie('access_token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
      })
      .send({
        email: user.email,
        name: user.name,
        contactPhone: user.contactPhone,
      });
  }

  @ApiOperation({ summary: 'Выход' })
  @Post('/auth/logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    console.log(req.cookies);
    if (req.cookies?.access_token) {
      res.clearCookie('access_token').send({});
    } else {
      throw new HttpException(
        'Пользователь не аутентифицирован',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 200 })
  @Post('/client/register')
  register(@Body() body: CreateUserDto) {
    return this.authService.register(body);
  }
}
