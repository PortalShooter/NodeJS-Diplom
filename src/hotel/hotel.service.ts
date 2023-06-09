import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Hotel, HotelDocument } from './schemas/hotel.schema';
import { HotelRoom, HotelRoomDocument } from './schemas/hotel-room.schema';
import { UpdateHotelParams } from './interfaces/UpdateHotelParams';
import { SearchHotelParams } from './interfaces/SearchHotelParams';
import { SearchRoomsParams } from './interfaces/SearchRoomsParams';
import { IHotelService } from './interfaces/IHotelService';
import { IHotelRoomService } from './interfaces/IHotelRoomService';
import { ID } from 'src/types';

@Injectable()
export class HotelService implements IHotelService {
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

  findById(id: string): Promise<Hotel> {
    return this.HotelModel.findById(id);
  }

  search(params: SearchHotelParams): Promise<Hotel[]> {
    return this.HotelModel.find(
      {},
      { id: true, title: true, description: true },
    )
      .skip(params.offset)
      .limit(params.limit);
  }

  update(id: string, data: UpdateHotelParams): Promise<Hotel> {
    return this.HotelModel.findByIdAndUpdate(
      id,
      {
        title: data.title,
        description: data.description,
        updatedAt: new Date(),
      },
      { projection: { id: true, title: true, description: true }, new: true },
    );
  }
}

@Injectable()
export class HotelRoomService implements IHotelRoomService {
  constructor(
    @InjectModel(HotelRoom.name)
    private hotelRoomModel: Model<HotelRoomDocument>,
  ) {}

  async create(data: Partial<HotelRoom>): Promise<HotelRoom> {
    const dateNow = new Date();
    const hotelRoom = new this.hotelRoomModel({
      hotel: data.hotel,
      description: data.description,
      createdAt: dateNow,
      updatedAt: dateNow,
      images: data.images,
    });

    await hotelRoom.save();

    return hotelRoom.populate('hotel', 'id title description');
  }

  findById(id: ID): Promise<HotelRoom> {
    if (isValidObjectId(id)) {
      return this.hotelRoomModel
        .findById(id)
        .populate('hotel', 'id title description');
    } else {
      throw new HttpException('Некорректный id', HttpStatus.BAD_REQUEST);
    }
  }

  update(id: string, data: Partial<HotelRoom>): Promise<HotelRoom> {
    return this.hotelRoomModel
      .findByIdAndUpdate(
        id,
        {
          description: data.description,
          $push: { images: { $each: data.images } },
          isEnabled: data.isEnabled,
          hotel: data.hotel,
          updatedAt: new Date(),
        },
        {
          projection: {
            id: true,
            title: true,
            description: true,
            images: true,
            hotel: true,
          },
          new: true,
        },
      )
      .populate('hotel', 'id title description');
  }

  search(params: SearchRoomsParams): Promise<HotelRoom[]> {
    return this.hotelRoomModel
      .find(
        { hotel: params.hotel },
        { id: true, description: true, images: true },
      )
      .skip(params.offset)
      .limit(params.limit)
      .populate('hotel', 'id title');
  }
}
