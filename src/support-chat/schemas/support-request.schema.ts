import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Message } from '../interfaces/Message';

export type SupportRequestDocument = SupportRequest & Document;

@Schema()
export class SupportRequest {
  @Prop({ required: true })
  public user: Types.ObjectId;

  @Prop({ required: true })
  public createdAt: Date;

  @Prop()
  public messages: Message[];

  @Prop()
  public isActive: boolean;
}

export const SupportRequestSchema =
  SchemaFactory.createForClass(SupportRequest);
