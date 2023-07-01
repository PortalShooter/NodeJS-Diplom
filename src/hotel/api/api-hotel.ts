import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { HotelRoomService, HotelService } from '../hotel.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateHotelParams } from '../interfaces/UpdateHotelParams';
import { SearchHotelParams } from '../interfaces/SearchHotelParams';

@ApiTags('Hotel')
@Controller('api')
export class ApiHotel {
  constructor(
    private readonly hotelService: HotelService,
    private readonly hotelRoomService: HotelRoomService,
  ) {}

  //TODO role admin добавить проверку и ответы 401 и 403
  @ApiOperation({ summary: 'Добавление гостиницы' })
  @Post('admin/hotels/')
  addHotel(@Body() body: UpdateHotelParams) {
    console.log(123);
    return this.hotelService.create(body);
  }

  //TODO role admin добавить проверку и ответы 401 и 403
  @ApiOperation({ summary: 'Получение списка гостиниц' })
  @Get('/admin/hotels')
  getHostelList(@Query() query: SearchHotelParams) {
    return this.hotelService.search(query);
  }

  //TODO role admin добавить проверку и ответы 401 и 403
  @ApiOperation({ summary: 'Изменение описания гостиницы' })
  @Put('/admin/hotels/:id')
  updateHostelDescription(
    @Param('id') id: string,
    @Body() query: UpdateHotelParams,
  ) {
    return this.hotelService.update(id, query);
  }

  // TODO под вопросом, нужен ли он вообще?
  // @ApiOperation({ summary: 'Поиск гостиниц' })
  // @Get('common/hotel-rooms')
  // searchHotels(@Query() query: SearchHotelParams) {
  //   return this.hotelService.search(query);
  // }
}
