import {
  Body,
  CallHandler,
  Controller,
  ExecutionContext,
  Get,
  Injectable,
  NestInterceptor,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { HotelRoomService, HotelService } from '../hotel.service';
import { ApiOperation, ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { UpdateHotelParams } from '../interfaces/UpdateHotelParams';
import { SearchHotelParams } from '../interfaces/SearchHotelParams';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
import { Observable } from 'rxjs';
import { FileService } from 'src/file/file.service';
import { omit } from 'lodash';
import { query } from 'express';
import { SearchRoomsParams } from '../interfaces/SearchRoomsParams';

// @Injectable()
// export class FileExtender implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     const req = context.switchToHttp().getRequest();
//     req.file['description'] = req.body.comment;
//     req.file['hotelId'] = req.body.outletId;
//     return next.handle();
//   }
// }

@ApiTags('Hotel')
@Controller('api')
export class ApiHotel {
  constructor(
    private readonly hotelService: HotelService,
    private readonly hotelRoomService: HotelRoomService,
    private readonly fileService: FileService,
  ) {}

  //TODO role admin добавить проверку и ответы 401 и 403
  @ApiOperation({ summary: 'Добавление гостиницы' })
  @Post('admin/hotels/')
  addHotel(@Body() body: UpdateHotelParams) {
    return this.hotelService.create(body);
  }

  //TODO role admin добавить проверку и ответы 401 и 403
  @ApiOperation({ summary: 'Получение списка гостиниц' })
  @Get('admin/hotels')
  getHostelList(@Query() query: SearchHotelParams) {
    return this.hotelService.search(query);
  }

  //TODO role admin добавить проверку и ответы 401 и 403
  @ApiOperation({ summary: 'Изменение описания гостиницы' })
  @Put('admin/hotels/:id')
  updateHostelDescription(
    @Param('id') id: string,
    @Body() query: UpdateHotelParams,
  ) {
    return this.hotelService.update(id, query);
  }

  //TODO role admin добавить проверку и ответы 401 и 403
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
  // @UseInterceptors(FileExtender)
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

    return hotelRoom;
  }

  @ApiOperation({ summary: 'Поиск номеров' })
  @Get('common/hotel-rooms')
  findHotelRooms(@Query() query: SearchRoomsParams) {
    const { hotel, limit, offset } = query;
    //TODO добавить проверку на роль пользователя
    return this.hotelRoomService.search({
      hotel,
      limit,
      offset,
      isEnabled: true,
    });
  }

  @ApiOperation({ summary: 'Информация о конкретном номере' })
  @Get('common/hotel-rooms/:id')
  getInfoHotelRoom(@Param('id') id: string) {
    return this.hotelRoomService.findById(id);
  }

  //TODO role admin добавить проверку и ответы 401 и 403
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
            type: 'string | File',
            format: 'binary',
          },
        },
      },
    },
  })
  updateHostelRoomDescription(
    @Param('id') id: string,
    @Body() query: UpdateHotelParams,
  ) {
    return this.hotelRoomService.update(id, query);
  }

  // TODO под вопросом, нужен ли он вообще?
  // @ApiOperation({ summary: 'Поиск гостиниц' })
  // @Get('common/hotel-rooms')
  // searchHotels(@Query() query: SearchHotelParams) {
  //   return this.hotelService.search(query);
  // }
}
