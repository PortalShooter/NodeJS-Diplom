import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../interfaces/IUser';
import { CreateUserDto } from './create-user.dto';

export class RegisterUserDto implements CreateUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
  readonly email: string;
  @ApiProperty({ example: 'string', description: 'Пароль' })
  readonly password: string;
  @ApiProperty({ example: 'Ваня', description: 'Имя' })
  readonly name: string;
  @ApiProperty({ example: '89892249531', description: 'Номер телефона' })
  readonly contactPhone: string;
  readonly role: Role.client;
}
