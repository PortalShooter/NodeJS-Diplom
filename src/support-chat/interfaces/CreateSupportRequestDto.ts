import { ApiProperty } from '@nestjs/swagger';
import { ID } from 'src/types';

export class CreateSupportRequestDto {
  @ApiProperty({ example: '', description: 'id пользователя', readOnly: true })
  user: ID;
  @ApiProperty({ example: '', description: 'Текст обращения' })
  text: string;
}
