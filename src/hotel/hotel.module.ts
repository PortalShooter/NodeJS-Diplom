import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelSchema } from './schemas/hotel.schema';
import { HotelRoom, HotelRoomSchema } from './schemas/hotel-room.schema';
import { HotelService, HotelRoomService } from './hotel.service';
import { ApiHotel } from './api/api-hotel';
import { FileService } from 'src/file/file.service';
import { AuthModule } from 'src/user/auth/auth.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hotel.name, schema: HotelSchema }]),
    MongooseModule.forFeature([
      { name: HotelRoom.name, schema: HotelRoomSchema },
    ]),
    AuthModule,
  ],
  providers: [HotelService, HotelRoomService, FileService],
  controllers: [ApiHotel],
  exports: [HotelService, HotelRoomService],
})
export class HotelModule {}
