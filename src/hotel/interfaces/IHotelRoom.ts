import { ID } from 'src/types';

export interface IHotelRoom {
  id: ID;
  hotel: ID;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  images: string[];
  isEnabled: boolean;
}
