import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDtoRequest {
  @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
  readonly email: string;
  @ApiProperty({ example: 'string', description: 'Пароль' })
  readonly password: string;
}

export class LoginUserDtoResponse {
  @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
  readonly email: string;
  @ApiProperty({ example: 'Ваня', description: 'Имя' })
  readonly name: string;
  @ApiProperty({ example: '89183457632', description: 'Номер телефона' })
  readonly contactPhone: string;
}
