import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type HotelRoomDocument = HotelRoom & Document;

@Schema()
export class HotelRoom {
  @Prop({ required: true })
  public hotel: Types.ObjectId;

  @Prop({ required: true, unique: true })
  public email: string;

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
