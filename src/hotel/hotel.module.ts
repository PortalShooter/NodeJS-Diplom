import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelSchema } from './schemas/hotel.schema';
import { HotelRoom, HotelRoomSchema } from './schemas/hotel-room.schema';
import { HotelService, HotelRoomService } from './hotel.service';
import { ApiHotel } from './api/api-hotel';
import { FileService } from 'src/file/file.service';
import { AuthService } from 'src/user/auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/user/auth/auth.module';
import { UserService } from 'src/user/user.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hotel.name, schema: HotelSchema }]),
    MongooseModule.forFeature([
      { name: HotelRoom.name, schema: HotelRoomSchema },
    ]),
  ],
  providers: [
    HotelService,
    HotelRoomService,
    FileService,
    // AuthService,
    // UserService,
    // JwtService,
  ],
  controllers: [ApiHotel],
})
export class HotelModule {}
