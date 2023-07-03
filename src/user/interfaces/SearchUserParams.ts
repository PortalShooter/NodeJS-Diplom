import { ApiProperty } from '@nestjs/swagger';

export class SearchUserParams {
  @ApiProperty({ example: 20, description: 'Количество записей в ответе' })
  limit: number;
  @ApiProperty({ example: 0, description: 'Сдвиг от начала списка' })
  offset: number;
  @ApiProperty({ example: '', description: 'Фильтр по полю', required: false })
  email: string;
  @ApiProperty({ example: '', description: 'Фильтр по полю', required: false })
  name: string;
  @ApiProperty({ example: '', description: 'Фильтр по полю', required: false })
  contactPhone: string;
}
