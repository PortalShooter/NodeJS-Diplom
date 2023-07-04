import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { Reservation, ReservationSchema } from './schemas/reservation.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiReservation } from './api/api-reservation';
import { HotelModule } from 'src/hotel/hotel.module';
import { AuthModule } from 'src/user/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
    ]),
    AuthModule,
    HotelModule,
  ],
  providers: [ReservationService],
  controllers: [ApiReservation],
})
export class ReservationModule {}
