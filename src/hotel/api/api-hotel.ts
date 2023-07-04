import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HotelRoomService, HotelService } from '../hotel.service';
import { ApiOperation, ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { UpdateHotelParams } from '../interfaces/UpdateHotelParams';
import { SearchHotelParams } from '../interfaces/SearchHotelParams';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
import { FileService } from 'src/file/file.service';
import { SearchRoomsParams } from '../interfaces/SearchRoomsParams';
import { JwtAuthGuard } from 'src/user/auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { AuthService } from 'src/user/auth/auth.service';
import { Role } from 'src/user/interfaces/IUser';

// @Injectable()
// export class FileExtender implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     const req = context.switchToHttp().getRequest();
//     req.file['description'] = req.body.comment;
//     req.file['hotelId'] = req.body.outletId;
//     return next.handle();
//   }
// }

@ApiTags('Отель')
@Controller('api')
export class ApiHotel {
  constructor(
    private readonly hotelService: HotelService,
    private readonly hotelRoomService: HotelRoomService,
    private readonly fileService: FileService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Добавление гостиницы' })
  @Post('admin/hotels/')
  async addHotel(@Body() body: UpdateHotelParams) {
    const hotel = await this.hotelService.create(body);
    return {
      id: hotel.id,
      title: body.title,
      description: body.description,
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Получение списка гостиниц' })
  @Get('admin/hotels/')
  getHostelList(@Query() query: SearchHotelParams) {
    return this.hotelService.search(query);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Изменение описания гостиницы' })
  @Put('admin/hotels/:id')
  updateHostelDescription(
    @Param('id') id: string,
    @Body() query: UpdateHotelParams,
  ) {
    return this.hotelService.update(id, query);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Добавление номера' })
  @Post('admin/hotel-rooms/')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        description: { type: 'string' },
        hotelId: { type: 'string' },
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('images'))
  async addHotelRoom(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() body,
  ) {
    const imagesPath = images.map((image) =>
      this.fileService.createFile(image),
    );

    const hotelRoom = await this.hotelRoomService.create({
      description: body.description,
      hotel: body.hotelId,
      images: imagesPath,
    });

    return {
      id: hotelRoom.id,
      description: hotelRoom.description,
      images: hotelRoom.images,
      isEnabled: hotelRoom.isEnabled,
      hotel: hotelRoom.hotel,
    };
  }

  @ApiOperation({ summary: 'Поиск номеров' })
  @Get('common/hotel-rooms/')
  async findHotelRooms(@Req() req: Request, @Query() query: SearchRoomsParams) {
    let isEnabled = false;
    const { hotel, limit, offset } = query;
    const token = req.cookies.access_token;
    if (!token) {
      isEnabled = true;
    } else {
      const user = await this.authService.getUserByToken(token);
      if (user.role === Role.client) {
        isEnabled = true;
      }
    }
    return this.hotelRoomService.search({
      hotel,
      limit,
      offset,
      isEnabled,
    });
  }

  @ApiOperation({ summary: 'Информация о конкретном номере' })
  @Get('common/hotel-rooms/:id')
  getInfoHotelRoom(@Param('id') id: string) {
    return this.hotelRoomService.getDetailInfoRoom(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Изменение описания номера' })
  @Put('admin/hotel-rooms/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        description: { type: 'string' },
        hotelId: { type: 'string' },
        isEnabled: { type: 'boolean' },
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('images'))
  updateHostelRoomDescription(
    @Param('id') id: string,
    @Body() query,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    const imagesPath = images.map((image) =>
      this.fileService.createFile(image),
    );
    return this.hotelRoomService.update(id, {
      ...query,
      hotel: query.hotelId,
      images: imagesPath,
    });
  }
}
