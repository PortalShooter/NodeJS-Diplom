import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  test() {
    return 'hello';
  }

  async createUser(userDto: CreateUserDto) {
    const user = new this.UserModel({
      ...userDto,
      passwordHash: userDto.password,
    });
    return user.save();
  }

  async getUserByEmail(email: string) {
    const user = await this.UserModel.findOne({ email });
    return user;
  }
}
