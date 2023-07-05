import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/user/auth/guards/jwt-auth.guard';
import { CreateSupportRequestDto } from '../interfaces/CreateSupportRequestDto';
import { Request } from 'express';
import { AuthService } from 'src/user/auth/auth.service';
import { SearchSupportRequestststs } from '../interfaces/SearchSupportRequests';
import { Role } from 'src/user/interfaces/IUser';
import { CreateBefore } from '../interfaces/CreatedBefore';
import { SupportRequestClientService } from '../services/support-request-client.service';
import { SupportRequestService } from '../services/support-request.service';

@ApiTags('Чат с техподдрежкой')
@Controller('api')
export class ApiSupportChat {
  constructor(
    private readonly supportRequestService: SupportRequestService,
    private readonly supportRequestClientService: SupportRequestClientService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Создание обращения в поддержку' })
  @Post('client/support-requests/')
  async createSupportRequest(
    @Req() req: Request,
    @Body() body: CreateSupportRequestDto,
  ) {
    const user = await this.authService.getUserByToken(
      req.cookies.access_token,
    );

    // Возвращаю как есть, потому что есть подозрение, что в ТЗ опечатка.
    // В ТЗ сервер должен возвращать такой же массив, как и в получение списка обращений
    return this.supportRequestClientService.createSupportRequest({
      text: body.text,
      user: user.id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Получение списка обращений в поддержку для клиента',
  })
  @Get('client/support-requests/')
  async getSupportRequests(
    @Req() req: Request,
    @Query() query: SearchSupportRequestststs, // может стоит переделать тип на GetChatListParams, но перед этим дополнив его нужными параметрами,
  ) {
    const user = await this.authService.getUserByToken(
      req.cookies.access_token,
    );

    return this.supportRequestService.findSupportRequests({
      user: user.id,
      offset: query.offset,
      isActive: query.isActive,
      limit: query.limit,
    });
  }

  // TODO допилить корректный ответ
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Получение списка обращений в поддержку для менеджера',
  })
  @Get('manager/support-requests/')
  async getSupportRequestsByManager(
    @Req() req: Request,
    @Query() query: SearchSupportRequestststs, // может стоит переделать тип на GetChatListParams, но перед этим дополнив его нужными параметрами,
  ) {
    const user = await this.authService.getUserByToken(
      req.cookies.access_token,
    );

    return this.supportRequestService.findSupportRequests({
      user: user.id,
      offset: query.offset,
      isActive: query.isActive,
      limit: query.limit,
    });
  }

  // В ТЗ написано, что в ответ должен вернуться массв сообщений, что противоречит ISupportRequestService.
  // По нему я должен вернуть одно сообщение
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Отправка сообщения',
  })
  @Post('common/support-requests/:id/messages')
  async sendMessage(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() body: CreateSupportRequestDto,
  ) {
    const user = await this.authService.getUserByToken(
      req.cookies.access_token,
    );
    if (user.role === Role.client || user.role === Role.manager) {
      return this.supportRequestService.sendMessage({
        author: user.id,
        text: body.text,
        supportRequest: id,
      });
    } else {
      throw new HttpException('У этого пользователя нет прав', 403);
    }
  }

  @ApiOperation({
    summary: 'Отправка события, что сообщения прочитаны',
  })
  @Post('common/support-requests/:id/messages/read')
  async markMessagesAsRead(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() body: CreateBefore,
  ) {
    const user = await this.authService.getUserByToken(
      req.cookies.access_token,
    );

    if (user.role === Role.client || user.role === Role.manager) {
      return this.supportRequestClientService.markMessagesAsRead({
        user: user.id,
        supportRequest: id,
        createdBefore: new Date(body.createdBefore), //TODO пока не понятно как этим пользоваться
      });
    } else {
      throw new HttpException('У этого пользователя нет прав', 403);
    }
  }
}
