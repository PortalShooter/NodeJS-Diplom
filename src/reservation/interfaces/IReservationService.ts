import { ID } from 'src/types';
import { Reservation } from '../schemas/reservation.schema';
import { ReservationDto } from './ReservationDto';
import { ReservationSearchOptions } from './ReservationSearchOptions';

export interface IReservationService {
  addReservation(data: ReservationDto): Promise<Reservation>;
  removeReservation(id: ID): Promise<void>;
  getReservations(
    filter: ReservationSearchOptions,
  ): Promise<Array<Reservation>>;
}
