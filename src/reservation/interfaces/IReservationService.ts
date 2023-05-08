import { IReservation } from './IReservation';
import { ReservationDto } from './ReservationDto';
import { ReservationSearchOptions } from './ReservationSearchOptions';
//TODO check id type
export interface IReservationService {
  addReservation(data: ReservationDto): Promise<IReservation>;
  removeReservation(id: string | number): Promise<void>;
  getReservations(
    filter: ReservationSearchOptions,
  ): Promise<Array<IReservation>>;
}
