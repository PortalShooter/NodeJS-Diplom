import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Reservation, ReservationSchema } from './schemas/reservation.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiReservation } from './api/api-reservation';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
    ]),
  ],
  providers: [ReservationService],
  controllers: [ReservationController, ApiReservation],
})
export class ReservationModule {}
