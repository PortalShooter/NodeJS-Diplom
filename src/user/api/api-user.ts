import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user.service';
import { IUser } from '../interfaces/IUser';
import { SearchUserParams } from '../interfaces/SearchUserParams';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';
@ApiTags('Управление пользователями')
@Controller('api')
export class ApiUser {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Создание пользователя' })
  @Post('admin/users/')
  addUser(@Body() body: IUser) {
    return this.authService.register({
      ...body,
      password: body.passwordHash,
      role: body.role,
    });
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Получение списка пользователей админом' })
  @Get('admin/users/')
  getUsersAdmin(@Query() query: SearchUserParams) {
    return this.userService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Получение списка пользователей менеджером' })
  @Get('manager/users/')
  getUsersManagement(@Query() query: SearchUserParams) {
    return this.userService.findAll(query);
  }
}
