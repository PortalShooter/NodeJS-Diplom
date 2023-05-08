import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  public title: string;

  @Prop({ required: true, unique: true })
  public email: string;

  @Prop({ required: true })
  public passwordHash: string;

  @Prop({ required: true })
  public name: string;

  @Prop({ required: true })
  public contactPhone: string;

  @Prop({ default: 'client' })
  public role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
