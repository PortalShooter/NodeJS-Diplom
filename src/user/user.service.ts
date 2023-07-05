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
    const user = new this.UserModel(data);
    return user.save();
  }

  findById(id: string): Promise<User> {
    return this.UserModel.findById(id);
  }

  findByEmail(email: string): Promise<User> {
    return this.UserModel.findOne({ email });
  }

  //TODO При поиске IUserService.findAll() поля email, name и contactPhone должны проверяться на частичное совпадение.
  findAll(params: SearchUserParams): Promise<User[]> {
    return this.UserModel.find(
      {},
      // { $text: { $search: params.email ?? '' } },
      // {
      //   filter: {
      //     email: { $regex: /^``/ },
      //     // as: 'item',
      //     // cond: { $gte: ['$$item.price', 100] },
      //   },
      // },
    );
  }
}
