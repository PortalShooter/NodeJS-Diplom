import { ApiProperty } from '@nestjs/swagger';

export class UpdateHotelParams {
  @ApiProperty({ example: 'Гостиница №1', description: 'Название гостиницы' })
  readonly title: string;
  @ApiProperty({
    example: 'Находится на берегу моря',
    description: 'Описание гостиницы',
  })
  readonly description: string;
}
