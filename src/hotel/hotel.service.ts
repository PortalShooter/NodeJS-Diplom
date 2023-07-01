import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Hotel, HotelDocument } from './schemas/hotel.schema';
import { HotelRoom, HotelRoomDocument } from './schemas/hotel-room.schema';
import { UpdateHotelParams } from './interfaces/UpdateHotelParams';
import { SearchHotelParams } from './interfaces/SearchHotelParams';
import { IHotel } from './interfaces/IHotel';

@Injectable()
export class HotelService {
  constructor(
    @InjectModel(Hotel.name) private HotelModel: Model<HotelDocument>,
  ) {}

  create(data: UpdateHotelParams): Promise<Hotel> {
    const dateNow = new Date();
    const hotel = new this.HotelModel({
      title: data.title,
      description: data.description,
      createdAt: dateNow,
      updatedAt: dateNow,
    });
    return hotel.save();
  }

  findById(id: ObjectId): Promise<Hotel> {
    return this.HotelModel.findById({ id });
  }
  // TODO
  search(params: SearchHotelParams) /*: Promise<IHotel[]>*/ {
    return this.HotelModel.find(
      /*{ title: params.title }*/ {},
      { id: true, title: true, description: true },
    )
      .skip(params.offset)
      .limit(params.limit);
  }

  update(id: string, data: UpdateHotelParams): Promise<IHotel> {
    return this.HotelModel.findByIdAndUpdate(
      id,
      { title: data.title, description: data.description },
      { projection: { id: true, title: true, description: true } },
    );
  }
}

@Injectable()
export class HotelRoomService {
  constructor(
    @InjectModel(Hotel.name) private HotelRoomModel: Model<HotelRoomDocument>,
  ) {}

  create(data: Partial<HotelRoom>): Promise<HotelRoom> {
    const hotelRoom = new this.HotelRoomModel({});
    return hotelRoom.save();
  }

  findById(id: ObjectId): Promise<HotelRoom> {
    return this.HotelRoomModel.findById({ id });
  }
}
