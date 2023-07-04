import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { IUser } from './interfaces/IUser';
import { SearchUserParams } from './interfaces/SearchUserParams';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  create(data: Partial<IUser>) {
    const user = new this.UserModel(data);
    return user.save();
  }

  findById(id: string): Promise<IUser> {
    return this.UserModel.findById(id);
  }

  findByEmail(email: string): Promise<IUser> {
    return this.UserModel.findOne({ email });
  }

  //TODO При поиске IUserService.findAll() поля email, name и contactPhone должны проверяться на частичное совпадение.
  findAll(params: SearchUserParams): Promise<IUser[]> {
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
