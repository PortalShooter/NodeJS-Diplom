import { ApiProperty } from '@nestjs/swagger';

export class SearchSupportRequestststs {
  @ApiProperty({ example: 20, description: 'Количество записей в ответе' })
  limit: number;
  @ApiProperty({ example: 0, description: 'Сдвиг от начала списка' })
  offset: number;
  @ApiProperty({
    example: false,
    description: 'Фильтр по полю',
    required: false,
  })
  isActive: boolean;
}
