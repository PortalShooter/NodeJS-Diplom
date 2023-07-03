import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, isValidObjectId } from 'mongoose';
import { Hotel, HotelDocument } from './schemas/hotel.schema';
import { HotelRoom, HotelRoomDocument } from './schemas/hotel-room.schema';
import { UpdateHotelParams } from './interfaces/UpdateHotelParams';
import { SearchHotelParams } from './interfaces/SearchHotelParams';
import { IHotel } from './interfaces/IHotel';
import { SearchRoomsParams } from './interfaces/SearchRoomsParams';

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
    return this.HotelModel.findById(id);
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
      { projection: { id: true, title: true, description: true }, new: true },
    );
  }
}

@Injectable()
export class HotelRoomService {
  constructor(
    @InjectModel(HotelRoom.name)
    private HotelRoomModel: Model<HotelRoomDocument>,
  ) {}

  async create(data: Partial<HotelRoom>): Promise<HotelRoom> {
    const dateNow = new Date();
    const hotelRoom = new this.HotelRoomModel({
      hotel: data.hotel,
      description: data.description,
      createdAt: dateNow,
      updatedAt: dateNow,
      images: data.images,
    });

    await hotelRoom.save();

    return hotelRoom.populate('hotel', 'id title description');
  }

  findById(id: string): Promise<HotelRoom> {
    if (isValidObjectId(id)) {
      return this.HotelRoomModel.findById(id);
    } else {
      throw new HttpException('Некорректный id', HttpStatus.BAD_REQUEST);
    }
  }

  update(id: string, data: Partial<HotelRoom>): Promise<HotelRoom> {
    return this.HotelRoomModel.findByIdAndUpdate(
      id,
      {
        description: data.description,
        images: data.images,
        isEnabled: data.isEnabled,
        hotel: data.hotel,
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
    ).populate('hotel', 'id title description');
  }

  search(params: SearchRoomsParams): Promise<HotelRoom[]> {
    return this.HotelRoomModel.find(
      { hotel: params.hotel },
      { id: true, description: true, images: true },
    )
      .skip(params.offset)
      .limit(params.limit)
      .populate('hotel', 'id title description');
  }
}
