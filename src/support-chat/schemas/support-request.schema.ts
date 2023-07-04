import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Message } from '../interfaces/Message';

export type SupportRequestDocument = SupportRequest & Document;

@Schema()
export class SupportRequest {
  public id: string;

  @Prop({ required: true })
  public user: Types.ObjectId;

  @Prop({ required: true })
  public createdAt: Date;

  @Prop({ default: [] })
  public messages: Message[];

  @Prop({ default: false })
  public isActive: boolean;
}

export const SupportRequestSchema =
  SchemaFactory.createForClass(SupportRequest);
