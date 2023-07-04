import { ApiProperty } from '@nestjs/swagger';

export class CreateSupportRequestDto {
  @ApiProperty({ example: '', description: 'id пользователя', readOnly: true })
  user: string;
  @ApiProperty({ example: '', description: 'Текст обращения' })
  text: string;
}
