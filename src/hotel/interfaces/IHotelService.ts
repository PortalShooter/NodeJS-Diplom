import { IHotel } from './IHotel';
import { SearchHotelParams } from './SearchHotelParams';
import { UpdateHotelParams } from './UpdateHotelParams';
export interface IHotelService {
  create(data: any): Promise<IHotel>;
  findById(id: string): Promise<IHotel>;
  search(params: SearchHotelParams): Promise<IHotel[]>;
  update(id: string, data: UpdateHotelParams): Promise<IHotel>;
}
