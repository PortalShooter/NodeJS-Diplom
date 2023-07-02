import { ApiProperty } from '@nestjs/swagger';

export class SearchHotelParams {
  @ApiProperty({ example: 20, description: 'Количество записей в ответе' })
  limit: number;
  @ApiProperty({ example: 0, description: 'Сдвиг от начала списка' })
  offset: number;
  // @ApiProperty({
  //   example: 'Гостиница "Гламур"',
  //   description: 'Название гостиниц',
  // })
  // title: string;
}
