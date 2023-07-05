import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../interfaces/IUser';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
  readonly email: string;
  @ApiProperty({ example: 'string', description: 'Пароль' })
  readonly password: string;
  @ApiProperty({ example: 'Ваня', description: 'Имя' })
  readonly name: string;
  @ApiProperty({ example: '89892249531', description: 'Номер телефона' })
  readonly contactPhone: string;
  @ApiProperty({
    description: 'Роль пользователя',
    required: false,
    default: Role.client,
  })
  readonly role: Role;
}

export class CreateUserDtoResponse {
  readonly id: string;
  @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
  readonly email: string;
  @ApiProperty({ example: 'Ваня', description: 'Имя' })
  readonly name: string;
}
