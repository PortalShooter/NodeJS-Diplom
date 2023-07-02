import { ApiProperty } from '@nestjs/swagger';

export class SearchRoomsParams {
  @ApiProperty({ example: 20, description: 'Количество записей в ответе' })
  limit: number;
  @ApiProperty({ example: 0, description: 'Сдвиг от начала списка' })
  offset: number;
  @ApiProperty({
    example: '64a184289c020a236201eaf3',
    description: 'ID гостиницы для фильтра',
  })
  hotel: string;
  isEnabled?: boolean;
}
