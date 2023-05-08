import { IHotel } from './IHotel';
import { SearchHotelParams } from './SearchHotelParams';
import { UpdateHotelParams } from './UpdateHotelParams';

// TODO не забыть про типы id
export interface IHotelService {
  create(data: any): Promise<IHotel>;
  findById(id: string | number): Promise<IHotel>;
  search(params: SearchHotelParams): Promise<IHotel[]>;
  update(id: string | number, data: UpdateHotelParams): Promise<IHotel>;
}
