import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user.service';
import { IUser, Role } from '../interfaces/IUser';
import { SearchUserParams } from '../interfaces/SearchUserParams';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleGuard } from '../auth/guards/role.guard';

// @Injectable()
// export class FileExtender implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     const req = context.switchToHttp().getRequest();
//     req.file['description'] = req.body.comment;
//     req.file['hotelId'] = req.body.outletId;
//     return next.handle();
//   }
// }

@ApiTags('Управление пользователями')
@Controller('api')
export class ApiUser {
  constructor(private readonly userService: UserService) {}

  //TODO role admin добавить проверку и ответы 401 и 403
  @ApiOperation({ summary: 'Создание пользователя' })
  @Post('admin/users/')
  addUser(@Body() body: IUser) {
    return this.userService.create(body);
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Получение списка пользователей' })
  @Get('admin/users/')
  getUsers(@Query() query: SearchUserParams) {
    try {
      return this.userService.findAll(query);
    } catch (e) {
      return e;
    }
  }
}
