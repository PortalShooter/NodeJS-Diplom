import { Module } from '@nestjs/common';
import { ApiHotelService } from './api-hotel.service';
import { ApiHotelController } from './api-hotel.controller';

@Module({
  providers: [ApiHotelService],
  controllers: [ApiHotelController],
})
export class ApiHotelModule {}
