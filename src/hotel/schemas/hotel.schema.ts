import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type HotelDocument = Hotel & Document;

@Schema()
export class Hotel {
  @Prop({ required: true })
  public title: Types.ObjectId;

  @Prop({ required: true, unique: true })
  public email: string;

  @Prop()
  public description: string;

  @Prop({ required: true })
  public createdAt: Date;

  @Prop({ required: true })
  public updatedAt: Date;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
