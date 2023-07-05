import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import { IUser, Role } from '../interfaces/IUser';

export type UserDocument = User & Document;

@Schema()
export class User implements IUser {
  public id: Types.ObjectId;

  @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
  @Prop({ required: true, unique: true })
  public email: string;

  @ApiProperty({ example: 'string', description: 'Пароль' })
  @Prop({ required: true })
  public passwordHash: string;

  @ApiProperty({ example: 'Ваня', description: 'Имя' })
  @Prop({ required: true })
  public name: string;

  @ApiProperty({ example: '89892249531', description: 'Номер телефона' })
  @Prop({ required: true })
  public contactPhone: string;

  @ApiProperty({ example: 'client', description: 'Роль пользователя' })
  @Prop({ default: 'client' })
  public role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
