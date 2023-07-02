import { IHotelRoom } from './IHotelRoom';
import { SearchRoomsParams } from './SearchRoomsParams';
export interface HotelRoomService {
  create(data: Partial<IHotelRoom>): Promise<IHotelRoom>;
  findById(id: string): Promise<IHotelRoom>;
  search(params: SearchRoomsParams): Promise<IHotelRoom[]>;
  update(id: string, data: Partial<IHotelRoom>): Promise<IHotelRoom>;
}
