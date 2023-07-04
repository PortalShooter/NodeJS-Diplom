import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reservation, ReservationDocument } from './schemas/reservation.schema';
import { Model } from 'mongoose';
import { ReservationDto } from './interfaces/ReservationDto';
import { HotelRoomService } from 'src/hotel/hotel.service';
import { IReservation } from './interfaces/IReservation';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
    private readonly hotelRoomService: HotelRoomService,
  ) {}

  async addReservation(data: ReservationDto): Promise<Reservation> {
    const { roomId } = data;
    const hotelRoom = await this.hotelRoomService.getDetailInfoRoom(roomId);
    const reservation = new this.reservationModel({
      userId: data.userId,
      roomId: data.roomId,
      hotelId: hotelRoom.hotel.id,
      dateStart: data.dateStart,
      dateEnd: data.dateEnd,
    });
    await reservation.save();
    //TODO - почему то не работает развертывание
    reservation.populate('roomId', 'description images');
    reservation.populate('hotelId', 'title description');
    return reservation;
  }

  getReservations(
    /*filter: ReservationSearchOptions*/ userId: string,
  ): Promise<Array<IReservation>> {
    //TODO - возвращать требуемый формат
    return this.reservationModel.find({ userId });
  }

  getReservationsById(id: string): Promise<IReservation> {
    return this.reservationModel.findById(id);
  }

  removeReservation(id: string): Promise<void> {
    this.reservationModel.findByIdAndDelete(id);
    return;
  }
}
