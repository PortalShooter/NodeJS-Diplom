import { IUser } from './IUser';
import { SearchUserParams } from './SearchUserParams';
export interface IUserService {
  create(data: Partial<IUser>): Promise<IUser>;
  findById(id: string | number): Promise<IUser>;
  findByEmail(email: string): Promise<IUser>;
  findAll(params: SearchUserParams): Promise<IUser[]>;
}
//TODO При поиске IUserService.findAll() поля email, name и contactPhone должны проверяться на частичное совпадение.
