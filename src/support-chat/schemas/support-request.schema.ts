import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Message } from '../interfaces/Message';
import { ID } from 'src/types';

export type SupportRequestDocument = SupportRequest & Document;

@Schema()
export class SupportRequest implements SupportRequest {
  public id: ID;

  @Prop({ required: true })
  public user: Types.ObjectId;

  @Prop({ required: true })
  public createdAt: Date;

  @Prop({ default: [] })
  public messages: Message[];

  @Prop({ default: true })
  public isActive: boolean;
}

export const SupportRequestSchema =
  SchemaFactory.createForClass(SupportRequest);
