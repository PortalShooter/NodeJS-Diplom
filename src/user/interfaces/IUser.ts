import { ApiProperty } from '@nestjs/swagger';

export class IUser {
  readonly id: string;
  @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
  readonly email: string;
  @ApiProperty({ example: 'string', description: 'Пароль' })
  readonly passwordHash: string;
  @ApiProperty({ example: 'Ваня', description: 'Имя' })
  readonly name: string;
  @ApiProperty({ example: '89892249531', description: 'Номер телефона' })
  readonly contactPhone: string;
  @ApiProperty({ example: 'admin', description: 'Роль пользователя' })
  role: Role;
}

export enum Role {
  client = 'client',
  admin = 'admin',
  manager = 'manager',
}
