import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { SearchUserParams } from './interfaces/SearchUserParams';
import { IUserService } from './interfaces/IUserService';

@Injectable()
export class UserService implements IUserService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  create(data: Partial<User>) {
    return this.UserModel.create(data);
  }

  findById(id: string): Promise<User> {
    return this.UserModel.findById(id);
  }

  findByEmail(email: string): Promise<User> {
    return this.UserModel.findOne({ email });
  }

  async findAll(params: SearchUserParams): Promise<User[]> {
    const filter: { [k: string]: any } = {};

    if (params.name) filter.name = params.name;

    if (params.email) filter.email = params.email;

    if (params.contactPhone) filter.contactPhone = params.contactPhone;

    if (params.limit && params.offset) {
      return await this.UserModel.find(filter)
        .skip(params.offset)
        .limit(params.limit);
    } else {
      return await this.UserModel.find(filter);
    }
  }
}
