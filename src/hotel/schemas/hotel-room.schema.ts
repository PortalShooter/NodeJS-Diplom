import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Hotel } from './hotel.schema';

export type HotelRoomDocument = HotelRoom & Document;

@Schema()
export class HotelRoom {
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: Hotel.name })
  public hotel: Types.ObjectId;

  @Prop({ default: [] })
  public images: string[];

  @Prop({ required: true, default: true })
  public isEnabled: boolean;

  @Prop()
  public description: string;

  @Prop({ required: true })
  public createdAt: Date;

  @Prop({ required: true })
  public updatedAt: Date;
}

export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);
