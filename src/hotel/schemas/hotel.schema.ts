import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type HotelDocument = Hotel & Document;
@Schema()
export class Hotel {
  @Prop({ unique: true, required: true })
  id: Types.ObjectId;

  @Prop({ required: true })
  public title: string;

  @Prop()
  public description: string;

  @Prop({ required: true })
  public createdAt: Date;

  @Prop({ required: true })
  public updatedAt: Date;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
