import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message implements Message {
  public id: Types.ObjectId;

  @Prop({ required: true })
  public author: Types.ObjectId;

  @Prop({ required: true })
  public sentAt: Date;

  @Prop({ required: true })
  public text: string;

  @Prop({ default: null })
  public readAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
