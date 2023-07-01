import { ApiProperty } from '@nestjs/swagger';

export class SearchHotelParams {
  @ApiProperty({ example: 20, description: 'Лимит на количество гостиниц' })
  limit: number;
  @ApiProperty({ example: 20, description: 'Сколько гостиниц надо пропустить' })
  offset: number;
  // @ApiProperty({
  //   example: 'Гостиница "Гламур"',
  //   description: 'Название гостиниц',
  // })
  // title: string;
}
