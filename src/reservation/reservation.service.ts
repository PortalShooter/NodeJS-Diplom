import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reservation, ReservationDocument } from './schemas/reservation.schema';
import { Model } from 'mongoose';
import { ReservationDto } from './interfaces/ReservationDto';
import { HotelRoomService } from 'src/hotel/hotel.service';
import { IReservationService } from './interfaces/IReservationService';
import { ReservationSearchOptions } from './interfaces/ReservationSearchOptions';
import { ID } from 'src/types';

@Injectable()
export class ReservationService implements IReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
    private readonly hotelRoomService: HotelRoomService,
  ) {}

  async addReservation(data: ReservationDto): Promise<Reservation> {
    const { roomId } = data;
    const hotelRoom = await this.hotelRoomService.findById(roomId);
    const reservation = new this.reservationModel({
      userId: data.userId,
      roomId: data.roomId,
      hotelId: hotelRoom.hotel.id,
      dateStart: data.dateStart,
      dateEnd: data.dateEnd,
    });
    await reservation.save();
    return reservation;
  }

  async getReservations(
    filter: ReservationSearchOptions,
  ): Promise<Array<Reservation>> {
    const searchFilter: { [key: string]: any } = {};

    if (filter.userId) searchFilter.userId = filter.userId;

    if (filter.dateStart) searchFilter.dateStart = filter.dateStart;

    if (filter.dateEnd) searchFilter.dateEnd = filter.dateEnd;

    return await this.reservationModel
      .find(searchFilter)
      .populate('hotelId', 'title description')
      .populate('roomId', 'images description');

    // return this.reservationModel
    //   .find({ userId }, { userId: false })
    //   ;
  }

  getReservationsById(id: ID): Promise<Reservation> {
    return this.reservationModel.findById(id);
  }

  removeReservation(id: ID): Promise<void> {
    this.reservationModel.findByIdAndDelete(id);
    return;
  }
}
