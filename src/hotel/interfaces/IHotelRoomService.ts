import { HotelRoom } from '../schemas/hotel-room.schema';
import { SearchRoomsParams } from './SearchRoomsParams';
export interface IHotelRoomService {
  create(data: Partial<HotelRoom>): Promise<HotelRoom>;
  findById(id: string): Promise<HotelRoom>;
  search(params: SearchRoomsParams): Promise<HotelRoom[]>;
  update(id: string, data: Partial<HotelRoom>): Promise<HotelRoom>;
}
