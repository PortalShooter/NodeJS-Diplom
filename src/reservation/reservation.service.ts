import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reservation, ReservationDocument } from './schemas/reservation.schema';
import { Model } from 'mongoose';
import { ReservationDto } from './interfaces/ReservationDto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
  ) {}

  addReservation(data: ReservationDto) /*: Promise<Reservation>*/ {
    const reservation = new this.reservationModel({});
    return reservation.save();
  }

  //   removeReservation(id: string): Promise<void>;
  //   getReservations(
  //     filter: ReservationSearchOptions,
  //   ): Promise<Array<IReservation>>;
}
