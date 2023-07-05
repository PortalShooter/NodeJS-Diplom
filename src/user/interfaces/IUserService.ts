import { User } from '../schemas/user.schema';
import { SearchUserParams } from './SearchUserParams';
export interface IUserService {
  create(data: Partial<User>): Promise<User>;
  findById(id: string | number): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findAll(params: SearchUserParams): Promise<User[]>;
}
