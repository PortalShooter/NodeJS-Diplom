import { HotelRoom } from './HotelRoom';
import { SearchRoomsParams } from './SearchRoomsParams';

//TODO id type
export interface HotelRoomService {
  create(data: Partial<HotelRoom>): Promise<HotelRoom>;
  findById(id: string | number): Promise<HotelRoom>;
  search(params: SearchRoomsParams): Promise<HotelRoom[]>;
  update(id: string | number, data: Partial<HotelRoom>): Promise<HotelRoom>;
}
