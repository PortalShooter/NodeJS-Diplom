import { IReservation } from './IReservation';
import { ReservationDto } from './ReservationDto';
import { ReservationSearchOptions } from './ReservationSearchOptions';

export interface IReservationService {
  addReservation(data: ReservationDto): Promise<IReservation>;
  removeReservation(id: string): Promise<void>;
  getReservations(
    filter: ReservationSearchOptions,
  ): Promise<Array<IReservation>>;
}
