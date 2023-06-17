import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { IUser } from './interfaces/IUser';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async create(userDto: Partial<IUser>) {
    const user = new this.UserModel({
      ...userDto,
      passwordHash: userDto.passwordHash,
    });
    return user.save();
  }

  async findByEmail(email: string) {
    const user = await this.UserModel.findOne({ email });
    return user;
  }

  async findById(id: string) {
    const user = await this.UserModel.findById({ id });
    return user;
  }

  async findAll() {
    const user = await this.UserModel.find();
    return user;
  }
}
